package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/BBKSDAPBD/vogelkop-data-center/internal/models"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type CoreRepository struct {
	db *pgxpool.Pool
}

func NewCoreRepository(db *pgxpool.Pool) *CoreRepository {
	return &CoreRepository{db: db}
}

// --- Conservation Areas ---

func (r *CoreRepository) ListConservationAreas(ctx context.Context, p models.PaginationParams) ([]models.ConservationArea, int, error) {
	var total int
	err := r.db.QueryRow(ctx, "SELECT COUNT(*) FROM core.conservation_areas WHERE deleted_at IS NULL").Scan(&total)
	if err != nil {
		return nil, 0, err
	}

	rows, err := r.db.Query(ctx,
		`SELECT area_id, area_register, area_name, area_description, area_note,
		        created_at, updated_at, is_active, created_by, updated_by
		 FROM core.conservation_areas WHERE deleted_at IS NULL
		 ORDER BY created_at DESC LIMIT $1 OFFSET $2`, p.PerPage, p.Offset())
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var items []models.ConservationArea
	for rows.Next() {
		var item models.ConservationArea
		if err := rows.Scan(&item.ID, &item.AreaRegister, &item.AreaName, &item.AreaDescription, &item.AreaNote,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy); err != nil {
			return nil, 0, err
		}
		items = append(items, item)
	}
	return items, total, nil
}

func (r *CoreRepository) GetConservationArea(ctx context.Context, id uuid.UUID) (*models.ConservationArea, error) {
	var item models.ConservationArea
	err := r.db.QueryRow(ctx,
		`SELECT area_id, area_register, area_name, area_description, area_note,
		        created_at, updated_at, is_active, created_by, updated_by
		 FROM core.conservation_areas WHERE area_id = $1 AND deleted_at IS NULL`, id).
		Scan(&item.ID, &item.AreaRegister, &item.AreaName, &item.AreaDescription, &item.AreaNote,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) CreateConservationArea(ctx context.Context, req models.ConservationAreaRequest, userID *uuid.UUID) (*models.ConservationArea, error) {
	id := uuid.New()
	now := time.Now()
	var item models.ConservationArea
	err := r.db.QueryRow(ctx,
		`INSERT INTO core.conservation_areas (area_id, area_register, area_name, area_description, area_note, created_at, is_active, created_by)
		 VALUES ($1, $2, $3, $4, $5, $6, true, $7)
		 RETURNING area_id, area_register, area_name, area_description, area_note, created_at, updated_at, is_active, created_by, updated_by`,
		id, req.AreaRegister, req.AreaName, req.AreaDescription, req.AreaNote, now, userID).
		Scan(&item.ID, &item.AreaRegister, &item.AreaName, &item.AreaDescription, &item.AreaNote,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) UpdateConservationArea(ctx context.Context, id uuid.UUID, req models.ConservationAreaRequest, userID *uuid.UUID) (*models.ConservationArea, error) {
	now := time.Now()
	var item models.ConservationArea
	err := r.db.QueryRow(ctx,
		`UPDATE core.conservation_areas
		 SET area_register=$1, area_name=$2, area_description=$3, area_note=$4, updated_at=$5, updated_by=$6
		 WHERE area_id=$7 AND deleted_at IS NULL
		 RETURNING area_id, area_register, area_name, area_description, area_note, created_at, updated_at, is_active, created_by, updated_by`,
		req.AreaRegister, req.AreaName, req.AreaDescription, req.AreaNote, now, userID, id).
		Scan(&item.ID, &item.AreaRegister, &item.AreaName, &item.AreaDescription, &item.AreaNote,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, fmt.Errorf("conservation area not found")
		}
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) DeleteConservationArea(ctx context.Context, id uuid.UUID, userID *uuid.UUID) error {
	now := time.Now()
	tag, err := r.db.Exec(ctx,
		`UPDATE core.conservation_areas SET deleted_at=$1, deleted_by=$2, is_active=false WHERE area_id=$3 AND deleted_at IS NULL`,
		now, userID, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return fmt.Errorf("conservation area not found")
	}
	return nil
}

// --- Legal Decisions ---

func (r *CoreRepository) ListLegalDecisions(ctx context.Context, p models.PaginationParams) ([]models.LegalDecision, int, error) {
	var total int
	err := r.db.QueryRow(ctx, "SELECT COUNT(*) FROM core.legal_decisions WHERE deleted_at IS NULL").Scan(&total)
	if err != nil {
		return nil, 0, err
	}

	rows, err := r.db.Query(ctx,
		`SELECT decision_id, decision_name, decision_date, decision_number, decision_description,
		        created_at, updated_at, is_active, created_by, updated_by
		 FROM core.legal_decisions WHERE deleted_at IS NULL
		 ORDER BY created_at DESC LIMIT $1 OFFSET $2`, p.PerPage, p.Offset())
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var items []models.LegalDecision
	for rows.Next() {
		var item models.LegalDecision
		if err := rows.Scan(&item.ID, &item.DecisionName, &item.DecisionDate, &item.DecisionNumber, &item.DecisionDescription,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy); err != nil {
			return nil, 0, err
		}
		items = append(items, item)
	}
	return items, total, nil
}

func (r *CoreRepository) GetLegalDecision(ctx context.Context, id uuid.UUID) (*models.LegalDecision, error) {
	var item models.LegalDecision
	err := r.db.QueryRow(ctx,
		`SELECT decision_id, decision_name, decision_date, decision_number, decision_description,
		        created_at, updated_at, is_active, created_by, updated_by
		 FROM core.legal_decisions WHERE decision_id = $1 AND deleted_at IS NULL`, id).
		Scan(&item.ID, &item.DecisionName, &item.DecisionDate, &item.DecisionNumber, &item.DecisionDescription,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) CreateLegalDecision(ctx context.Context, req models.LegalDecisionRequest, userID *uuid.UUID) (*models.LegalDecision, error) {
	id := uuid.New()
	now := time.Now()

	var decisionDate *time.Time
	if req.DecisionDate != nil {
		parsed, err := time.Parse("2006-01-02", *req.DecisionDate)
		if err != nil {
			return nil, fmt.Errorf("invalid date format, use YYYY-MM-DD")
		}
		decisionDate = &parsed
	}

	var item models.LegalDecision
	err := r.db.QueryRow(ctx,
		`INSERT INTO core.legal_decisions (decision_id, decision_name, decision_date, decision_number, decision_description, created_at, is_active, created_by)
		 VALUES ($1, $2, $3, $4, $5, $6, true, $7)
		 RETURNING decision_id, decision_name, decision_date, decision_number, decision_description, created_at, updated_at, is_active, created_by, updated_by`,
		id, req.DecisionName, decisionDate, req.DecisionNumber, req.DecisionDescription, now, userID).
		Scan(&item.ID, &item.DecisionName, &item.DecisionDate, &item.DecisionNumber, &item.DecisionDescription,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) UpdateLegalDecision(ctx context.Context, id uuid.UUID, req models.LegalDecisionRequest, userID *uuid.UUID) (*models.LegalDecision, error) {
	now := time.Now()

	var decisionDate *time.Time
	if req.DecisionDate != nil {
		parsed, err := time.Parse("2006-01-02", *req.DecisionDate)
		if err != nil {
			return nil, fmt.Errorf("invalid date format, use YYYY-MM-DD")
		}
		decisionDate = &parsed
	}

	var item models.LegalDecision
	err := r.db.QueryRow(ctx,
		`UPDATE core.legal_decisions
		 SET decision_name=$1, decision_date=$2, decision_number=$3, decision_description=$4, updated_at=$5, updated_by=$6
		 WHERE decision_id=$7 AND deleted_at IS NULL
		 RETURNING decision_id, decision_name, decision_date, decision_number, decision_description, created_at, updated_at, is_active, created_by, updated_by`,
		req.DecisionName, decisionDate, req.DecisionNumber, req.DecisionDescription, now, userID, id).
		Scan(&item.ID, &item.DecisionName, &item.DecisionDate, &item.DecisionNumber, &item.DecisionDescription,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, fmt.Errorf("legal decision not found")
		}
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) DeleteLegalDecision(ctx context.Context, id uuid.UUID, userID *uuid.UUID) error {
	now := time.Now()
	tag, err := r.db.Exec(ctx,
		`UPDATE core.legal_decisions SET deleted_at=$1, deleted_by=$2, is_active=false WHERE decision_id=$3 AND deleted_at IS NULL`,
		now, userID, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return fmt.Errorf("legal decision not found")
	}
	return nil
}

// --- Locations ---

func (r *CoreRepository) ListLocations(ctx context.Context, p models.PaginationParams) ([]models.Location, int, error) {
	var total int
	err := r.db.QueryRow(ctx, "SELECT COUNT(*) FROM core.locations WHERE deleted_at IS NULL").Scan(&total)
	if err != nil {
		return nil, 0, err
	}

	rows, err := r.db.Query(ctx,
		`SELECT location_id, regency_name, province_name,
		        created_at, updated_at, is_active, created_by, updated_by
		 FROM core.locations WHERE deleted_at IS NULL
		 ORDER BY created_at DESC LIMIT $1 OFFSET $2`, p.PerPage, p.Offset())
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var items []models.Location
	for rows.Next() {
		var item models.Location
		if err := rows.Scan(&item.ID, &item.RegencyName, &item.ProvinceName,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy); err != nil {
			return nil, 0, err
		}
		items = append(items, item)
	}
	return items, total, nil
}

func (r *CoreRepository) GetLocation(ctx context.Context, id uuid.UUID) (*models.Location, error) {
	var item models.Location
	err := r.db.QueryRow(ctx,
		`SELECT location_id, regency_name, province_name,
		        created_at, updated_at, is_active, created_by, updated_by
		 FROM core.locations WHERE location_id = $1 AND deleted_at IS NULL`, id).
		Scan(&item.ID, &item.RegencyName, &item.ProvinceName,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) CreateLocation(ctx context.Context, req models.LocationRequest, userID *uuid.UUID) (*models.Location, error) {
	id := uuid.New()
	now := time.Now()
	var item models.Location
	err := r.db.QueryRow(ctx,
		`INSERT INTO core.locations (location_id, regency_name, province_name, created_at, is_active, created_by)
		 VALUES ($1, $2, $3, $4, true, $5)
		 RETURNING location_id, regency_name, province_name, created_at, updated_at, is_active, created_by, updated_by`,
		id, req.RegencyName, req.ProvinceName, now, userID).
		Scan(&item.ID, &item.RegencyName, &item.ProvinceName,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) UpdateLocation(ctx context.Context, id uuid.UUID, req models.LocationRequest, userID *uuid.UUID) (*models.Location, error) {
	now := time.Now()
	var item models.Location
	err := r.db.QueryRow(ctx,
		`UPDATE core.locations SET regency_name=$1, province_name=$2, updated_at=$3, updated_by=$4
		 WHERE location_id=$5 AND deleted_at IS NULL
		 RETURNING location_id, regency_name, province_name, created_at, updated_at, is_active, created_by, updated_by`,
		req.RegencyName, req.ProvinceName, now, userID, id).
		Scan(&item.ID, &item.RegencyName, &item.ProvinceName,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, fmt.Errorf("location not found")
		}
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) DeleteLocation(ctx context.Context, id uuid.UUID, userID *uuid.UUID) error {
	now := time.Now()
	tag, err := r.db.Exec(ctx,
		`UPDATE core.locations SET deleted_at=$1, deleted_by=$2, is_active=false WHERE location_id=$3 AND deleted_at IS NULL`,
		now, userID, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return fmt.Errorf("location not found")
	}
	return nil
}

// --- Functions ---

func (r *CoreRepository) ListFunctions(ctx context.Context, p models.PaginationParams) ([]models.Function, int, error) {
	var total int
	err := r.db.QueryRow(ctx, "SELECT COUNT(*) FROM core.functions WHERE deleted_at IS NULL").Scan(&total)
	if err != nil {
		return nil, 0, err
	}

	rows, err := r.db.Query(ctx,
		`SELECT function_id, function_name, function_description,
		        created_at, updated_at, is_active, created_by, updated_by
		 FROM core.functions WHERE deleted_at IS NULL
		 ORDER BY created_at DESC LIMIT $1 OFFSET $2`, p.PerPage, p.Offset())
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var items []models.Function
	for rows.Next() {
		var item models.Function
		if err := rows.Scan(&item.ID, &item.FunctionName, &item.FunctionDescription,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy); err != nil {
			return nil, 0, err
		}
		items = append(items, item)
	}
	return items, total, nil
}

func (r *CoreRepository) GetFunction(ctx context.Context, id uuid.UUID) (*models.Function, error) {
	var item models.Function
	err := r.db.QueryRow(ctx,
		`SELECT function_id, function_name, function_description,
		        created_at, updated_at, is_active, created_by, updated_by
		 FROM core.functions WHERE function_id = $1 AND deleted_at IS NULL`, id).
		Scan(&item.ID, &item.FunctionName, &item.FunctionDescription,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) CreateFunction(ctx context.Context, req models.FunctionRequest, userID *uuid.UUID) (*models.Function, error) {
	id := uuid.New()
	now := time.Now()
	var item models.Function
	err := r.db.QueryRow(ctx,
		`INSERT INTO core.functions (function_id, function_name, function_description, created_at, is_active, created_by)
		 VALUES ($1, $2, $3, $4, true, $5)
		 RETURNING function_id, function_name, function_description, created_at, updated_at, is_active, created_by, updated_by`,
		id, req.FunctionName, req.FunctionDescription, now, userID).
		Scan(&item.ID, &item.FunctionName, &item.FunctionDescription,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) UpdateFunction(ctx context.Context, id uuid.UUID, req models.FunctionRequest, userID *uuid.UUID) (*models.Function, error) {
	now := time.Now()
	var item models.Function
	err := r.db.QueryRow(ctx,
		`UPDATE core.functions SET function_name=$1, function_description=$2, updated_at=$3, updated_by=$4
		 WHERE function_id=$5 AND deleted_at IS NULL
		 RETURNING function_id, function_name, function_description, created_at, updated_at, is_active, created_by, updated_by`,
		req.FunctionName, req.FunctionDescription, now, userID, id).
		Scan(&item.ID, &item.FunctionName, &item.FunctionDescription,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, fmt.Errorf("function not found")
		}
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) DeleteFunction(ctx context.Context, id uuid.UUID, userID *uuid.UUID) error {
	now := time.Now()
	tag, err := r.db.Exec(ctx,
		`UPDATE core.functions SET deleted_at=$1, deleted_by=$2, is_active=false WHERE function_id=$3 AND deleted_at IS NULL`,
		now, userID, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return fmt.Errorf("function not found")
	}
	return nil
}

// --- Zoning Blocks ---

func (r *CoreRepository) ListZoningBlocks(ctx context.Context, p models.PaginationParams) ([]models.ZoningBlock, int, error) {
	var total int
	err := r.db.QueryRow(ctx, "SELECT COUNT(*) FROM core.zoning_blocks WHERE deleted_at IS NULL").Scan(&total)
	if err != nil {
		return nil, 0, err
	}

	rows, err := r.db.Query(ctx,
		`SELECT block_id, area_id, block_type, block_description,
		        created_at, updated_at, is_active, created_by, updated_by
		 FROM core.zoning_blocks WHERE deleted_at IS NULL
		 ORDER BY created_at DESC LIMIT $1 OFFSET $2`, p.PerPage, p.Offset())
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var items []models.ZoningBlock
	for rows.Next() {
		var item models.ZoningBlock
		if err := rows.Scan(&item.ID, &item.AreaID, &item.BlockType, &item.BlockDescription,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy); err != nil {
			return nil, 0, err
		}
		items = append(items, item)
	}
	return items, total, nil
}

func (r *CoreRepository) GetZoningBlock(ctx context.Context, id uuid.UUID) (*models.ZoningBlock, error) {
	var item models.ZoningBlock
	err := r.db.QueryRow(ctx,
		`SELECT block_id, area_id, block_type, block_description,
		        created_at, updated_at, is_active, created_by, updated_by
		 FROM core.zoning_blocks WHERE block_id = $1 AND deleted_at IS NULL`, id).
		Scan(&item.ID, &item.AreaID, &item.BlockType, &item.BlockDescription,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) CreateZoningBlock(ctx context.Context, req models.ZoningBlockRequest, userID *uuid.UUID) (*models.ZoningBlock, error) {
	id := uuid.New()
	now := time.Now()
	var item models.ZoningBlock
	err := r.db.QueryRow(ctx,
		`INSERT INTO core.zoning_blocks (block_id, area_id, block_type, block_description, created_at, is_active, created_by)
		 VALUES ($1, $2, $3, $4, $5, true, $6)
		 RETURNING block_id, area_id, block_type, block_description, created_at, updated_at, is_active, created_by, updated_by`,
		id, req.AreaID, req.BlockType, req.BlockDescription, now, userID).
		Scan(&item.ID, &item.AreaID, &item.BlockType, &item.BlockDescription,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) UpdateZoningBlock(ctx context.Context, id uuid.UUID, req models.ZoningBlockRequest, userID *uuid.UUID) (*models.ZoningBlock, error) {
	now := time.Now()
	var item models.ZoningBlock
	err := r.db.QueryRow(ctx,
		`UPDATE core.zoning_blocks SET area_id=$1, block_type=$2, block_description=$3, updated_at=$4, updated_by=$5
		 WHERE block_id=$6 AND deleted_at IS NULL
		 RETURNING block_id, area_id, block_type, block_description, created_at, updated_at, is_active, created_by, updated_by`,
		req.AreaID, req.BlockType, req.BlockDescription, now, userID, id).
		Scan(&item.ID, &item.AreaID, &item.BlockType, &item.BlockDescription,
			&item.CreatedAt, &item.UpdatedAt, &item.IsActive, &item.CreatedBy, &item.UpdatedBy)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, fmt.Errorf("zoning block not found")
		}
		return nil, err
	}
	return &item, nil
}

func (r *CoreRepository) DeleteZoningBlock(ctx context.Context, id uuid.UUID, userID *uuid.UUID) error {
	now := time.Now()
	tag, err := r.db.Exec(ctx,
		`UPDATE core.zoning_blocks SET deleted_at=$1, deleted_by=$2, is_active=false WHERE block_id=$3 AND deleted_at IS NULL`,
		now, userID, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return fmt.Errorf("zoning block not found")
	}
	return nil
}
