package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID           uuid.UUID  `json:"id" db:"user_id"`
	Email        string     `json:"email" db:"email"`
	Name         *string    `json:"name" db:"name"`
	PasswordHash string     `json:"-" db:"password_hash"`
	Avatar       *string    `json:"avatar" db:"avatar"`
	VerifiedAt   *time.Time `json:"verified_at" db:"verified_at"`
	CreatedAt    time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt    *time.Time `json:"updated_at" db:"updated_at"`
	DeletedAt    *time.Time `json:"deleted_at" db:"deleted_at"`
	IsActive     bool       `json:"is_active" db:"is_active"`
}

type Account struct {
	ID           uuid.UUID  `json:"id" db:"account_id"`
	UserID       uuid.UUID  `json:"user_id" db:"user_id"`
	Provider     string     `json:"provider" db:"provider"`
	ProviderID   string     `json:"provider_id" db:"provider_id"`
	RefreshToken *string    `json:"refresh_token" db:"refresh_token"`
	AccessToken  *string    `json:"access_token" db:"access_token"`
	ExpiresAt    *time.Time `json:"expires_at" db:"expires_at"`
	TokenType    *string    `json:"token_type" db:"token_type"`
	AccountScope *string    `json:"account_scope" db:"account_scope"`
	IDToken      *string    `json:"id_token" db:"id_token"`
	SessionState *string    `json:"session_state" db:"session_state"`
	CreatedAt    time.Time  `json:"created_at" db:"created_at"`
}
