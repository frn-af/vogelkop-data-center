package services

import (
	"context"
	"fmt"
	"time"

	"github.com/BBKSDAPBD/vogelkop-data-center/internal/config"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/models"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/repository"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AuthService struct {
	repo *repository.AuthRepository
	cfg  *config.Config
}

func NewAuthService(db *pgxpool.Pool, cfg *config.Config) *AuthService {
	return &AuthService{repo: repository.NewAuthRepository(db), cfg: cfg}
}

func (s *AuthService) GenerateJWT(user *models.User) (string, error) {
	roleName := "viewer"
	if user.RoleName != nil {
		roleName = *user.RoleName
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID.String(),
		"email":   user.Email,
		"role":    roleName,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})
	return token.SignedString([]byte(s.cfg.JWTSecret))
}

func (s *AuthService) GetUserByID(ctx context.Context, id uuid.UUID) (*models.User, error) {
	return s.repo.GetUserByID(ctx, id)
}

func (s *AuthService) GetOrCreateUserFromGoogle(ctx context.Context, email, name, avatar, providerID string) (*models.User, error) {
	existing, err := s.repo.GetUserByEmail(ctx, email)
	if err != nil {
		return nil, err
	}

	if existing != nil {
		if !existing.IsActive {
			return nil, fmt.Errorf("account is deactivated")
		}

		tx, err := s.repo.BeginTx(ctx)
		if err != nil {
			return nil, err
		}
		defer tx.Rollback(ctx)

		account, err := s.repo.GetAccountByProvider(ctx, tx, existing.ID, "google")
		if err != nil {
			return nil, err
		}
		if account == nil {
			newAccount := &models.Account{
				ID:         uuid.New(),
				UserID:     existing.ID,
				Provider:   "google",
				ProviderID: providerID,
			}
			if err := s.repo.CreateAccount(ctx, tx, newAccount); err != nil {
				return nil, err
			}
		}

		if err := tx.Commit(ctx); err != nil {
			return nil, err
		}
		return existing, nil
	}

	viewerRole, err := s.repo.GetRoleByName(ctx, "viewer")
	if err != nil {
		return nil, err
	}

	tx, err := s.repo.BeginTx(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	now := time.Now()
	viewerName := "viewer"
	user := &models.User{
		ID:         uuid.New(),
		Email:      email,
		Name:       &name,
		Avatar:     &avatar,
		VerifiedAt: &now,
		IsActive:   true,
	}
	if viewerRole != nil {
		user.RoleID = &viewerRole.ID
		user.RoleName = &viewerName
	}

	if err := s.repo.CreateUser(ctx, tx, user); err != nil {
		return nil, err
	}

	newAccount := &models.Account{
		ID:         uuid.New(),
		UserID:     user.ID,
		Provider:   "google",
		ProviderID: providerID,
	}
	if err := s.repo.CreateAccount(ctx, tx, newAccount); err != nil {
		return nil, err
	}

	if err := tx.Commit(ctx); err != nil {
		return nil, err
	}

	return user, nil
}
