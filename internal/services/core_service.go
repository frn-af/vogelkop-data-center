package services

import (
	"context"

	"github.com/BBKSDAPBD/vogelkop-data-center/internal/models"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/repository"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type CoreService struct {
	repo *repository.CoreRepository
}

func NewCoreService(db *pgxpool.Pool) *CoreService {
	return &CoreService{repo: repository.NewCoreRepository(db)}
}

func (s *CoreService) ListConservationAreas(ctx context.Context, p models.PaginationParams) (*models.PaginatedResponse, error) {
	p.SetDefaults()
	items, total, err := s.repo.ListConservationAreas(ctx, p)
	if err != nil {
		return nil, err
	}
	totalPages := (total + p.PerPage - 1) / p.PerPage
	return &models.PaginatedResponse{Data: items, Total: total, Page: p.Page, PerPage: p.PerPage, TotalPages: totalPages}, nil
}

func (s *CoreService) GetConservationArea(ctx context.Context, id uuid.UUID) (*models.ConservationArea, error) {
	return s.repo.GetConservationArea(ctx, id)
}

func (s *CoreService) CreateConservationArea(ctx context.Context, req models.ConservationAreaRequest, userID *uuid.UUID) (*models.ConservationArea, error) {
	return s.repo.CreateConservationArea(ctx, req, userID)
}

func (s *CoreService) UpdateConservationArea(ctx context.Context, id uuid.UUID, req models.ConservationAreaRequest, userID *uuid.UUID) (*models.ConservationArea, error) {
	return s.repo.UpdateConservationArea(ctx, id, req, userID)
}

func (s *CoreService) DeleteConservationArea(ctx context.Context, id uuid.UUID, userID *uuid.UUID) error {
	return s.repo.DeleteConservationArea(ctx, id, userID)
}

func (s *CoreService) ListLegalDecisions(ctx context.Context, p models.PaginationParams) (*models.PaginatedResponse, error) {
	p.SetDefaults()
	items, total, err := s.repo.ListLegalDecisions(ctx, p)
	if err != nil {
		return nil, err
	}
	totalPages := (total + p.PerPage - 1) / p.PerPage
	return &models.PaginatedResponse{Data: items, Total: total, Page: p.Page, PerPage: p.PerPage, TotalPages: totalPages}, nil
}

func (s *CoreService) GetLegalDecision(ctx context.Context, id uuid.UUID) (*models.LegalDecision, error) {
	return s.repo.GetLegalDecision(ctx, id)
}

func (s *CoreService) CreateLegalDecision(ctx context.Context, req models.LegalDecisionRequest, userID *uuid.UUID) (*models.LegalDecision, error) {
	return s.repo.CreateLegalDecision(ctx, req, userID)
}

func (s *CoreService) UpdateLegalDecision(ctx context.Context, id uuid.UUID, req models.LegalDecisionRequest, userID *uuid.UUID) (*models.LegalDecision, error) {
	return s.repo.UpdateLegalDecision(ctx, id, req, userID)
}

func (s *CoreService) DeleteLegalDecision(ctx context.Context, id uuid.UUID, userID *uuid.UUID) error {
	return s.repo.DeleteLegalDecision(ctx, id, userID)
}

func (s *CoreService) ListLocations(ctx context.Context, p models.PaginationParams) (*models.PaginatedResponse, error) {
	p.SetDefaults()
	items, total, err := s.repo.ListLocations(ctx, p)
	if err != nil {
		return nil, err
	}
	totalPages := (total + p.PerPage - 1) / p.PerPage
	return &models.PaginatedResponse{Data: items, Total: total, Page: p.Page, PerPage: p.PerPage, TotalPages: totalPages}, nil
}

func (s *CoreService) GetLocation(ctx context.Context, id uuid.UUID) (*models.Location, error) {
	return s.repo.GetLocation(ctx, id)
}

func (s *CoreService) CreateLocation(ctx context.Context, req models.LocationRequest, userID *uuid.UUID) (*models.Location, error) {
	return s.repo.CreateLocation(ctx, req, userID)
}

func (s *CoreService) UpdateLocation(ctx context.Context, id uuid.UUID, req models.LocationRequest, userID *uuid.UUID) (*models.Location, error) {
	return s.repo.UpdateLocation(ctx, id, req, userID)
}

func (s *CoreService) DeleteLocation(ctx context.Context, id uuid.UUID, userID *uuid.UUID) error {
	return s.repo.DeleteLocation(ctx, id, userID)
}

func (s *CoreService) ListFunctions(ctx context.Context, p models.PaginationParams) (*models.PaginatedResponse, error) {
	p.SetDefaults()
	items, total, err := s.repo.ListFunctions(ctx, p)
	if err != nil {
		return nil, err
	}
	totalPages := (total + p.PerPage - 1) / p.PerPage
	return &models.PaginatedResponse{Data: items, Total: total, Page: p.Page, PerPage: p.PerPage, TotalPages: totalPages}, nil
}

func (s *CoreService) GetFunction(ctx context.Context, id uuid.UUID) (*models.Function, error) {
	return s.repo.GetFunction(ctx, id)
}

func (s *CoreService) CreateFunction(ctx context.Context, req models.FunctionRequest, userID *uuid.UUID) (*models.Function, error) {
	return s.repo.CreateFunction(ctx, req, userID)
}

func (s *CoreService) UpdateFunction(ctx context.Context, id uuid.UUID, req models.FunctionRequest, userID *uuid.UUID) (*models.Function, error) {
	return s.repo.UpdateFunction(ctx, id, req, userID)
}

func (s *CoreService) DeleteFunction(ctx context.Context, id uuid.UUID, userID *uuid.UUID) error {
	return s.repo.DeleteFunction(ctx, id, userID)
}

func (s *CoreService) ListZoningBlocks(ctx context.Context, p models.PaginationParams) (*models.PaginatedResponse, error) {
	p.SetDefaults()
	items, total, err := s.repo.ListZoningBlocks(ctx, p)
	if err != nil {
		return nil, err
	}
	totalPages := (total + p.PerPage - 1) / p.PerPage
	return &models.PaginatedResponse{Data: items, Total: total, Page: p.Page, PerPage: p.PerPage, TotalPages: totalPages}, nil
}

func (s *CoreService) GetZoningBlock(ctx context.Context, id uuid.UUID) (*models.ZoningBlock, error) {
	return s.repo.GetZoningBlock(ctx, id)
}

func (s *CoreService) CreateZoningBlock(ctx context.Context, req models.ZoningBlockRequest, userID *uuid.UUID) (*models.ZoningBlock, error) {
	return s.repo.CreateZoningBlock(ctx, req, userID)
}

func (s *CoreService) UpdateZoningBlock(ctx context.Context, id uuid.UUID, req models.ZoningBlockRequest, userID *uuid.UUID) (*models.ZoningBlock, error) {
	return s.repo.UpdateZoningBlock(ctx, id, req, userID)
}

func (s *CoreService) DeleteZoningBlock(ctx context.Context, id uuid.UUID, userID *uuid.UUID) error {
	return s.repo.DeleteZoningBlock(ctx, id, userID)
}
