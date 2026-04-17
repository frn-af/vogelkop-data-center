package services

import (
	"context"
	"time"

	"github.com/BBKSDAPBD/vogelkop-data-center/internal/config"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/models"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AuthService struct {
	db  *pgxpool.Pool
	cfg *config.Config
}

func NewAuthService(db *pgxpool.Pool, cfg *config.Config) *AuthService {
	return &AuthService{db: db, cfg: cfg}
}

func (s *AuthService) GenerateJWT(user *models.User) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID.String(),
		"email":   user.Email,
		"exp":     time.Now().Add(time.Hour * 24).Unix(), // 24 hours
	})

	return token.SignedString([]byte(s.cfg.JWTSecret))
}

func (s *AuthService) GetOrCreateUserFromGoogle(ctx context.Context, email, name, avatar, providerID string) (*models.User, error) {
	tx, err := s.db.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	var user models.User

	err = tx.QueryRow(ctx, "SELECT user_id, email, name, avatar, verified_at, created_at, is_active FROM auth.users WHERE email = $1", email).
		Scan(&user.ID, &user.Email, &user.Name, &user.Avatar, &user.VerifiedAt, &user.CreatedAt, &user.IsActive)

	if err != nil {
		if err == pgx.ErrNoRows {
			// Create User
			user.ID = uuid.New()
			user.Email = email
			user.Name = &name
			user.Avatar = &avatar
			now := time.Now()
			user.VerifiedAt = &now
			user.IsActive = true
			user.PasswordHash = "oauth_dummy_hash" // not null in db

			_, err = tx.Exec(ctx, `
				INSERT INTO auth.users (user_id, email, name, password_hash, avatar, verified_at, is_active)
				VALUES ($1, $2, $3, $4, $5, $6, $7)`,
				user.ID, user.Email, user.Name, user.PasswordHash, user.Avatar, user.VerifiedAt, user.IsActive,
			)
			if err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	}

	// Check if account exists
	var accountID uuid.UUID
	err = tx.QueryRow(ctx, "SELECT account_id FROM auth.accounts WHERE user_id = $1 AND provider = 'google'", user.ID).Scan(&accountID)
	if err != nil {
		if err == pgx.ErrNoRows {
			// Create Account link
			accountID = uuid.New()
			_, err = tx.Exec(ctx, `
				INSERT INTO auth.accounts (account_id, user_id, provider, provider_id)
				VALUES ($1, $2, $3, $4)`,
				accountID, user.ID, "google", providerID,
			)
			if err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	}

	if err := tx.Commit(ctx); err != nil {
		return nil, err
	}

	return &user, nil
}
