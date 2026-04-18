package handlers

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/BBKSDAPBD/vogelkop-data-center/internal/config"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func testHandlerConfig() *config.Config {
	return &config.Config{
		JWTSecret:    "test-secret",
		FrontendURL:  "http://localhost:3000",
		CookieDomain: "localhost",
		CookieSecure: false,
	}
}

func TestGetMe_NoUserID(t *testing.T) {
	gin.SetMode(gin.TestMode)

	cfg := testHandlerConfig()
	handler := &AuthHandler{cfg: cfg}

	r := gin.New()
	r.GET("/auth/me", handler.GetMe)

	req, _ := http.NewRequest("GET", "/auth/me", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnauthorized, w.Code)
	assert.Contains(t, w.Body.String(), "Authentication required")
}

func TestGetMe_InvalidUserID(t *testing.T) {
	gin.SetMode(gin.TestMode)

	cfg := testHandlerConfig()
	handler := &AuthHandler{cfg: cfg}

	r := gin.New()
	r.Use(func(c *gin.Context) {
		c.Set("userID", "not-a-uuid")
		c.Next()
	})
	r.GET("/auth/me", handler.GetMe)

	req, _ := http.NewRequest("GET", "/auth/me", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnauthorized, w.Code)
	assert.Contains(t, w.Body.String(), "Invalid user ID")
}

func TestLogout_ClearsCookie(t *testing.T) {
	gin.SetMode(gin.TestMode)

	cfg := testHandlerConfig()
	handler := &AuthHandler{cfg: cfg}

	r := gin.New()
	r.POST("/auth/logout", handler.Logout)

	req, _ := http.NewRequest("POST", "/auth/logout", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "Logged out")

	cookies := w.Result().Cookies()
	var tokenCookie *http.Cookie
	for _, c := range cookies {
		if c.Name == "token" {
			tokenCookie = c
			break
		}
	}
	assert.NotNil(t, tokenCookie, "token cookie should be set in response")
	assert.Equal(t, "", tokenCookie.Value)
	assert.True(t, tokenCookie.MaxAge < 0, "token cookie MaxAge should be negative (expired)")
}

func TestGoogleCallback_MissingState(t *testing.T) {
	gin.SetMode(gin.TestMode)

	cfg := testHandlerConfig()
	handler := &AuthHandler{cfg: cfg}

	r := gin.New()
	r.GET("/auth/google/callback", handler.GoogleCallback)

	req, _ := http.NewRequest("GET", "/auth/google/callback", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "Missing state parameter")
}
