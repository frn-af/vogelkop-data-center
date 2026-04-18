package repository

import (
	"context"
	"time"

	"github.com/BBKSDAPBD/vogelkop-data-center/internal/models"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AuthRepository struct {
	db *pgxpool.Pool
}

func NewAuthRepository(db *pgxpool.Pool) *AuthRepository {
	return &AuthRepository{db: db}
}

func (r *AuthRepository) BeginTx(ctx context.Context) (pgx.Tx, error) {
	return r.db.Begin(ctx)
}

const userColumnsWithRole = `u.user_id, u.email, u.name, u.password_hash, u.avatar, u.verified_at,
	u.created_at, u.updated_at, u.deleted_at, u.is_active, u.role_id, r.name`

func scanUserWithRole(row pgx.Row) (*models.User, error) {
	var user models.User
	err := row.Scan(
		&user.ID, &user.Email, &user.Name, &user.PasswordHash, &user.Avatar, &user.VerifiedAt,
		&user.CreatedAt, &user.UpdatedAt, &user.DeletedAt, &user.IsActive, &user.RoleID, &user.RoleName,
	)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func (r *AuthRepository) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	row := r.db.QueryRow(ctx,
		`SELECT `+userColumnsWithRole+`
		 FROM auth.users u
		 LEFT JOIN auth.roles r ON u.role_id = r.role_id
		 WHERE u.email = $1 AND u.deleted_at IS NULL`, email)
	return scanUserWithRole(row)
}

func (r *AuthRepository) GetUserByID(ctx context.Context, id uuid.UUID) (*models.User, error) {
	row := r.db.QueryRow(ctx,
		`SELECT `+userColumnsWithRole+`
		 FROM auth.users u
		 LEFT JOIN auth.roles r ON u.role_id = r.role_id
		 WHERE u.user_id = $1 AND u.deleted_at IS NULL`, id)
	return scanUserWithRole(row)
}

func (r *AuthRepository) CreateUser(ctx context.Context, tx pgx.Tx, user *models.User) error {
	now := time.Now()
	user.CreatedAt = now
	user.IsActive = true

	_, err := tx.Exec(ctx,
		`INSERT INTO auth.users (user_id, email, name, password_hash, avatar, verified_at, created_at, is_active, role_id)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
		user.ID, user.Email, user.Name, user.PasswordHash, user.Avatar, user.VerifiedAt, user.CreatedAt, user.IsActive, user.RoleID,
	)
	return err
}

func (r *AuthRepository) GetAccountByProvider(ctx context.Context, tx pgx.Tx, userID uuid.UUID, provider string) (*models.Account, error) {
	var account models.Account
	err := tx.QueryRow(ctx,
		`SELECT account_id, user_id, provider, provider_id, refresh_token, access_token,
		        expires_at, token_type, account_scope, id_token, session_state, created_at
		 FROM auth.accounts WHERE user_id = $1 AND provider = $2`, userID, provider).
		Scan(&account.ID, &account.UserID, &account.Provider, &account.ProviderID,
			&account.RefreshToken, &account.AccessToken, &account.ExpiresAt, &account.TokenType,
			&account.AccountScope, &account.IDToken, &account.SessionState, &account.CreatedAt)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &account, nil
}

func (r *AuthRepository) CreateAccount(ctx context.Context, tx pgx.Tx, account *models.Account) error {
	account.CreatedAt = time.Now()
	_, err := tx.Exec(ctx,
		`INSERT INTO auth.accounts (account_id, user_id, provider, provider_id, created_at)
		 VALUES ($1, $2, $3, $4, $5)`,
		account.ID, account.UserID, account.Provider, account.ProviderID, account.CreatedAt,
	)
	return err
}

func (r *AuthRepository) GetRoleByName(ctx context.Context, name string) (*models.Role, error) {
	var role models.Role
	err := r.db.QueryRow(ctx,
		`SELECT role_id, name, description, created_at, is_active
		 FROM auth.roles WHERE name = $1 AND deleted_at IS NULL`, name).
		Scan(&role.ID, &role.Name, &role.Description, &role.CreatedAt, &role.IsActive)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &role, nil
}
