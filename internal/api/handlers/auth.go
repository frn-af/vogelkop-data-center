package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/BBKSDAPBD/vogelkop-data-center/internal/config"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/db"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/services"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type AuthHandler struct {
	authService *services.AuthService
	oauthConfig *oauth2.Config
	cfg         *config.Config
}

func NewAuthHandler(cfg *config.Config, authService *services.AuthService) *AuthHandler {
	oauthConfig := &oauth2.Config{
		ClientID:     cfg.GoogleClientID,
		ClientSecret: cfg.GoogleClientSecret,
		RedirectURL:  cfg.GoogleRedirectURL,
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: google.Endpoint,
	}

	return &AuthHandler{
		authService: authService,
		oauthConfig: oauthConfig,
		cfg:         cfg,
	}
}

// GoogleLogin godoc
// @Summary      Redirects to Google OAuth
// @Description  Initiates Google OAuth flow
// @Tags         Auth
// @Success      302
// @Router       /auth/google/login [get]
func (h *AuthHandler) GoogleLogin(c *gin.Context) {
	state := uuid.New().String()
	err := db.RedisClient.Set(c.Request.Context(), "oauth_state:"+state, "1", 10*time.Minute).Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create OAuth state"})
		return
	}
	url := h.oauthConfig.AuthCodeURL(state, oauth2.AccessTypeOffline)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

// GoogleCallback godoc
// @Summary      Google OAuth Callback
// @Description  Handles OAuth callback, sets httpOnly cookie, and redirects to frontend
// @Tags         Auth
// @Param        code query string true "OAuth Code"
// @Param        state query string true "OAuth State"
// @Success      302
// @Router       /auth/google/callback [get]
func (h *AuthHandler) GoogleCallback(c *gin.Context) {
	state := c.Query("state")
	if state == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing state parameter"})
		return
	}

	result, err := db.RedisClient.GetDel(c.Request.Context(), "oauth_state:"+state).Result()
	if err != nil || result == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired state"})
		return
	}

	code := c.Query("code")
	if code == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Code is required"})
		return
	}

	token, err := h.oauthConfig.Exchange(context.Background(), code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to exchange token"})
		return
	}

	client := h.oauthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil || resp.StatusCode != http.StatusOK {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user info"})
		return
	}
	defer resp.Body.Close()

	var userInfo struct {
		ID      string `json:"id"`
		Email   string `json:"email"`
		Name    string `json:"name"`
		Picture string `json:"picture"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse user info"})
		return
	}

	user, err := h.authService.GetOrCreateUserFromGoogle(
		context.Background(),
		userInfo.Email,
		userInfo.Name,
		userInfo.Picture,
		userInfo.ID,
	)
	if err != nil {
		if err.Error() == "account is deactivated" {
			c.Redirect(http.StatusTemporaryRedirect, h.cfg.FrontendURL+"/auth/login?error=deactivated")
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error", "details": err.Error()})
		return
	}

	jwtToken, err := h.authService.GenerateJWT(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.SetCookie("token", jwtToken, 86400, "/", h.cfg.CookieDomain, h.cfg.CookieSecure, true)
	c.Redirect(http.StatusTemporaryRedirect, h.cfg.FrontendURL+"/dashboard")
}

// GetMe godoc
// @Summary      Get current user
// @Description  Returns the authenticated user's profile
// @Tags         Auth
// @Security     BearerAuth
// @Produce      json
// @Success      200  {object}  map[string]interface{}
// @Failure      401  {object}  map[string]interface{}
// @Router       /auth/me [get]
func (h *AuthHandler) GetMe(c *gin.Context) {
	userIDVal, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}

	userIDStr, ok := userIDVal.(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID"})
		return
	}

	userID, err := uuid.Parse(userIDStr)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID format"})
		return
	}

	user, err := h.authService.GetUserByID(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user"})
		return
	}
	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"id":        user.ID,
			"email":     user.Email,
			"name":      user.Name,
			"avatar":    user.Avatar,
			"role":      user.RoleName,
			"is_active": user.IsActive,
		},
	})
}

// Logout godoc
// @Summary      Logout
// @Description  Clears the authentication cookie
// @Tags         Auth
// @Success      200  {object}  map[string]interface{}
// @Router       /auth/logout [post]
func (h *AuthHandler) Logout(c *gin.Context) {
	c.SetCookie("token", "", -1, "/", h.cfg.CookieDomain, h.cfg.CookieSecure, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logged out"})
}
