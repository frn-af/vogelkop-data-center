package models

import (
	"time"

	"github.com/google/uuid"
)

type AuditFields struct {
	CreatedAt time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt *time.Time `json:"updated_at,omitempty" db:"updated_at"`
	DeletedAt *time.Time `json:"-" db:"deleted_at"`
	IsActive  bool       `json:"is_active" db:"is_active"`
	CreatedBy *uuid.UUID `json:"created_by,omitempty" db:"created_by"`
	UpdatedBy *uuid.UUID `json:"updated_by,omitempty" db:"updated_by"`
	DeletedBy *uuid.UUID `json:"-" db:"deleted_by"`
}

type ConservationArea struct {
	ID              uuid.UUID `json:"id" db:"area_id"`
	AreaRegister    int       `json:"area_register" db:"area_register"`
	AreaName        *string   `json:"area_name" db:"area_name"`
	AreaDescription *string   `json:"area_description" db:"area_description"`
	AreaNote        *string   `json:"area_note" db:"area_note"`
	AuditFields
}

type ConservationAreaRequest struct {
	AreaRegister    int     `json:"area_register" binding:"required"`
	AreaName        *string `json:"area_name"`
	AreaDescription *string `json:"area_description"`
	AreaNote        *string `json:"area_note"`
}

type LegalDecision struct {
	ID                  uuid.UUID  `json:"id" db:"decision_id"`
	DecisionName        *string    `json:"decision_name" db:"decision_name"`
	DecisionDate        *time.Time `json:"decision_date" db:"decision_date"`
	DecisionNumber      *string    `json:"decision_number" db:"decision_number"`
	DecisionDescription *string    `json:"decision_description" db:"decision_description"`
	AuditFields
}

type LegalDecisionRequest struct {
	DecisionName        *string `json:"decision_name"`
	DecisionDate        *string `json:"decision_date"`
	DecisionNumber      *string `json:"decision_number"`
	DecisionDescription *string `json:"decision_description"`
}

type Location struct {
	ID           uuid.UUID `json:"id" db:"location_id"`
	RegencyName  *string   `json:"regency_name" db:"regency_name"`
	ProvinceName *string   `json:"province_name" db:"province_name"`
	AuditFields
}

type LocationRequest struct {
	RegencyName  *string `json:"regency_name"`
	ProvinceName *string `json:"province_name"`
}

type Function struct {
	ID                  uuid.UUID `json:"id" db:"function_id"`
	FunctionName        *string   `json:"function_name" db:"function_name"`
	FunctionDescription *string   `json:"function_description" db:"function_description"`
	AuditFields
}

type FunctionRequest struct {
	FunctionName        *string `json:"function_name"`
	FunctionDescription *string `json:"function_description"`
}

type ZoningBlock struct {
	ID               uuid.UUID `json:"id" db:"block_id"`
	AreaID           uuid.UUID `json:"area_id" db:"area_id"`
	BlockType        *string   `json:"block_type" db:"block_type"`
	BlockDescription *string   `json:"block_description" db:"block_description"`
	AuditFields
}

type ZoningBlockRequest struct {
	AreaID           uuid.UUID `json:"area_id" binding:"required"`
	BlockType        *string   `json:"block_type"`
	BlockDescription *string   `json:"block_description"`
}

type PaginationParams struct {
	Page    int `form:"page" binding:"min=1"`
	PerPage int `form:"per_page" binding:"min=1,max=100"`
}

type PaginatedResponse struct {
	Data       interface{} `json:"data"`
	Total      int         `json:"total"`
	Page       int         `json:"page"`
	PerPage    int         `json:"per_page"`
	TotalPages int         `json:"total_pages"`
}

func (p *PaginationParams) SetDefaults() {
	if p.Page == 0 {
		p.Page = 1
	}
	if p.PerPage == 0 {
		p.PerPage = 20
	}
}

func (p *PaginationParams) Offset() int {
	return (p.Page - 1) * p.PerPage
}
