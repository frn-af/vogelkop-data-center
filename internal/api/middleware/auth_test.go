package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/BBKSDAPBD/vogelkop-data-center/internal/config"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/stretchr/testify/assert"
)

const testSecret = "test-jwt-secret-key"

func generateTestJWT(secret string, claims jwt.MapClaims) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	str, _ := token.SignedString([]byte(secret))
	return str
}

func testConfig() *config.Config {
	return &config.Config{
		JWTSecret:   testSecret,
		FrontendURL: "http://localhost:3000",
	}
}

func validClaims() jwt.MapClaims {
	return jwt.MapClaims{
		"user_id": "550e8400-e29b-41d4-a716-446655440000",
		"email":   "test@example.com",
		"role":    "editor",
		"exp":     time.Now().Add(time.Hour).Unix(),
	}
}

func setupTestRouter(middlewares ...gin.HandlerFunc) *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(middlewares...)
	r.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"userID": c.GetString("userID"),
			"role":   c.GetString("role"),
		})
	})
	return r
}

func TestAuthRequired_ValidTokenInCookie(t *testing.T) {
	cfg := testConfig()
	token := generateTestJWT(testSecret, validClaims())

	r := setupTestRouter(AuthRequired(cfg))
	req, _ := http.NewRequest("GET", "/test", nil)
	req.AddCookie(&http.Cookie{Name: "token", Value: token})
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestAuthRequired_ValidTokenInHeader(t *testing.T) {
	cfg := testConfig()
	token := generateTestJWT(testSecret, validClaims())

	r := setupTestRouter(AuthRequired(cfg))
	req, _ := http.NewRequest("GET", "/test", nil)
	req.Header.Set("Authorization", "Bearer "+token)
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestAuthRequired_NoToken(t *testing.T) {
	cfg := testConfig()

	r := setupTestRouter(AuthRequired(cfg))
	req, _ := http.NewRequest("GET", "/test", nil)
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnauthorized, w.Code)
	assert.Contains(t, w.Body.String(), "Authentication required")
}

func TestAuthRequired_ExpiredToken(t *testing.T) {
	cfg := testConfig()
	claims := validClaims()
	claims["exp"] = time.Now().Add(-time.Hour).Unix()
	token := generateTestJWT(testSecret, claims)

	r := setupTestRouter(AuthRequired(cfg))
	req, _ := http.NewRequest("GET", "/test", nil)
	req.AddCookie(&http.Cookie{Name: "token", Value: token})
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnauthorized, w.Code)
	assert.Contains(t, w.Body.String(), "Invalid token")
}

func TestAuthRequired_InvalidSignature(t *testing.T) {
	cfg := testConfig()
	token := generateTestJWT("wrong-secret", validClaims())

	r := setupTestRouter(AuthRequired(cfg))
	req, _ := http.NewRequest("GET", "/test", nil)
	req.AddCookie(&http.Cookie{Name: "token", Value: token})
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnauthorized, w.Code)
	assert.Contains(t, w.Body.String(), "Invalid token")
}

func TestAuthRequired_CookiePriorityOverHeader(t *testing.T) {
	cfg := testConfig()
	cookieToken := generateTestJWT(testSecret, validClaims())
	headerToken := generateTestJWT("wrong-secret", validClaims())

	r := setupTestRouter(AuthRequired(cfg))
	req, _ := http.NewRequest("GET", "/test", nil)
	req.AddCookie(&http.Cookie{Name: "token", Value: cookieToken})
	req.Header.Set("Authorization", "Bearer "+headerToken)
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestRoleRequired_AllowedRole(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(func(c *gin.Context) {
		c.Set("role", "editor")
		c.Next()
	})
	r.Use(RoleRequired("admin", "editor"))
	r.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{"ok": true})
	})

	req, _ := http.NewRequest("GET", "/test", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestRoleRequired_DeniedRole(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(func(c *gin.Context) {
		c.Set("role", "viewer")
		c.Next()
	})
	r.Use(RoleRequired("admin", "editor"))
	r.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{"ok": true})
	})

	req, _ := http.NewRequest("GET", "/test", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusForbidden, w.Code)
	assert.Contains(t, w.Body.String(), "Insufficient permissions")
}

func TestRoleRequired_NoRole(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(RoleRequired("admin", "editor"))
	r.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{"ok": true})
	})

	req, _ := http.NewRequest("GET", "/test", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusForbidden, w.Code)
	assert.Contains(t, w.Body.String(), "No role assigned")
}

func TestCORS_MatchingOrigin(t *testing.T) {
	cfg := testConfig()

	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(CORS(cfg))
	r.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{"ok": true})
	})

	req, _ := http.NewRequest("GET", "/test", nil)
	req.Header.Set("Origin", "http://localhost:3000")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, "http://localhost:3000", w.Header().Get("Access-Control-Allow-Origin"))
	assert.Equal(t, "true", w.Header().Get("Access-Control-Allow-Credentials"))
}

func TestCORS_NonMatchingOrigin(t *testing.T) {
	cfg := testConfig()

	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(CORS(cfg))
	r.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{"ok": true})
	})

	req, _ := http.NewRequest("GET", "/test", nil)
	req.Header.Set("Origin", "http://evil.com")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Empty(t, w.Header().Get("Access-Control-Allow-Origin"))
}

func TestCORS_OptionsRequest(t *testing.T) {
	cfg := testConfig()

	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(CORS(cfg))
	r.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{"ok": true})
	})

	req, _ := http.NewRequest("OPTIONS", "/test", nil)
	req.Header.Set("Origin", "http://localhost:3000")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNoContent, w.Code)
}
