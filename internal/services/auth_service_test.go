package services

import (
	"testing"
	"time"

	"github.com/BBKSDAPBD/vogelkop-data-center/internal/config"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/models"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const testJWTSecret = "test-jwt-secret-key"

func testAuthService() *AuthService {
	return &AuthService{
		cfg: &config.Config{JWTSecret: testJWTSecret},
	}
}

func testUser() *models.User {
	roleName := "editor"
	return &models.User{
		ID:       uuid.MustParse("550e8400-e29b-41d4-a716-446655440000"),
		Email:    "test@example.com",
		RoleName: &roleName,
		IsActive: true,
	}
}

func TestGenerateJWT_IncludesRoleClaim(t *testing.T) {
	svc := testAuthService()
	user := testUser()

	tokenStr, err := svc.GenerateJWT(user)
	require.NoError(t, err)

	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return []byte(testJWTSecret), nil
	})
	require.NoError(t, err)

	claims := token.Claims.(jwt.MapClaims)
	assert.Equal(t, user.ID.String(), claims["user_id"])
	assert.Equal(t, user.Email, claims["email"])
	assert.Equal(t, "editor", claims["role"])
}

func TestGenerateJWT_DefaultRole(t *testing.T) {
	svc := testAuthService()
	user := testUser()
	user.RoleName = nil

	tokenStr, err := svc.GenerateJWT(user)
	require.NoError(t, err)

	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return []byte(testJWTSecret), nil
	})
	require.NoError(t, err)

	claims := token.Claims.(jwt.MapClaims)
	assert.Equal(t, "viewer", claims["role"])
}

func TestGenerateJWT_ValidSignature(t *testing.T) {
	svc := testAuthService()
	user := testUser()

	tokenStr, err := svc.GenerateJWT(user)
	require.NoError(t, err)

	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return []byte(testJWTSecret), nil
	})
	require.NoError(t, err)
	assert.True(t, token.Valid)
}

func TestGenerateJWT_Expiry(t *testing.T) {
	svc := testAuthService()
	user := testUser()

	tokenStr, err := svc.GenerateJWT(user)
	require.NoError(t, err)

	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return []byte(testJWTSecret), nil
	})
	require.NoError(t, err)

	claims := token.Claims.(jwt.MapClaims)
	expFloat := claims["exp"].(float64)
	expTime := time.Unix(int64(expFloat), 0)
	expected := time.Now().Add(24 * time.Hour)

	diff := expTime.Sub(expected)
	if diff < 0 {
		diff = -diff
	}
	assert.Less(t, diff, 5*time.Second, "JWT expiry should be approximately 24 hours from now")
}

func TestGenerateJWT_WrongSecretFails(t *testing.T) {
	svc := testAuthService()
	user := testUser()

	tokenStr, err := svc.GenerateJWT(user)
	require.NoError(t, err)

	_, err = jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return []byte("wrong-secret"), nil
	})
	assert.Error(t, err)
}
