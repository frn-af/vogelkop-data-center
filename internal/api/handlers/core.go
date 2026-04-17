package handlers

import (
	"net/http"

	"github.com/BBKSDAPBD/vogelkop-data-center/internal/models"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/services"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CoreHandler struct {
	svc *services.CoreService
}

func NewCoreHandler(svc *services.CoreService) *CoreHandler {
	return &CoreHandler{svc: svc}
}

func getUserIDFromCtx(c *gin.Context) *uuid.UUID {
	val, exists := c.Get("userID")
	if !exists {
		return nil
	}
	str, ok := val.(string)
	if !ok {
		return nil
	}
	id, err := uuid.Parse(str)
	if err != nil {
		return nil
	}
	return &id
}

// ListConservationAreas godoc
// @Summary      List conservation areas
// @Description  Get paginated list of conservation areas
// @Tags         Conservation Areas
// @Produce      json
// @Param        page      query  int  false  "Page number"  default(1)
// @Param        per_page  query  int  false  "Items per page"  default(20)
// @Success      200  {object}  models.PaginatedResponse
// @Failure      500  {object}  map[string]interface{}
// @Security     BearerAuth
// @Router       /conservation-areas [get]
func (h *CoreHandler) ListConservationAreas(c *gin.Context) {
	var p models.PaginationParams
	if err := c.ShouldBindQuery(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result, err := h.svc.ListConservationAreas(c.Request.Context(), p)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

// GetConservationArea godoc
// @Summary      Get a conservation area
// @Description  Get a single conservation area by ID
// @Tags         Conservation Areas
// @Produce      json
// @Param        id   path  string  true  "Conservation Area ID"
// @Success      200  {object}  models.ConservationArea
// @Failure      404  {object}  map[string]interface{}
// @Security     BearerAuth
// @Router       /conservation-areas/{id} [get]
func (h *CoreHandler) GetConservationArea(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	item, err := h.svc.GetConservationArea(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if item == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}

// CreateConservationArea godoc
// @Summary      Create a conservation area
// @Description  Create a new conservation area
// @Tags         Conservation Areas
// @Accept       json
// @Produce      json
// @Param        body  body  models.ConservationAreaRequest  true  "Conservation Area data"
// @Success      201   {object}  models.ConservationArea
// @Failure      400   {object}  map[string]interface{}
// @Security     BearerAuth
// @Router       /conservation-areas [post]
func (h *CoreHandler) CreateConservationArea(c *gin.Context) {
	var req models.ConservationAreaRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item, err := h.svc.CreateConservationArea(c.Request.Context(), req, getUserIDFromCtx(c))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, item)
}

// UpdateConservationArea godoc
// @Summary      Update a conservation area
// @Description  Update an existing conservation area
// @Tags         Conservation Areas
// @Accept       json
// @Produce      json
// @Param        id    path  string  true  "Conservation Area ID"
// @Param        body  body  models.ConservationAreaRequest  true  "Conservation Area data"
// @Success      200   {object}  models.ConservationArea
// @Failure      400   {object}  map[string]interface{}
// @Failure      404   {object}  map[string]interface{}
// @Security     BearerAuth
// @Router       /conservation-areas/{id} [put]
func (h *CoreHandler) UpdateConservationArea(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	var req models.ConservationAreaRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item, err := h.svc.UpdateConservationArea(c.Request.Context(), id, req, getUserIDFromCtx(c))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, item)
}

// DeleteConservationArea godoc
// @Summary      Delete a conservation area
// @Description  Soft-delete a conservation area
// @Tags         Conservation Areas
// @Param        id   path  string  true  "Conservation Area ID"
// @Success      200  {object}  map[string]interface{}
// @Failure      404  {object}  map[string]interface{}
// @Security     BearerAuth
// @Router       /conservation-areas/{id} [delete]
func (h *CoreHandler) DeleteConservationArea(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	if err := h.svc.DeleteConservationArea(c.Request.Context(), id, getUserIDFromCtx(c)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

// ListLegalDecisions godoc
// @Summary      List legal decisions
// @Description  Get paginated list of legal decisions
// @Tags         Legal Decisions
// @Produce      json
// @Param        page      query  int  false  "Page number"  default(1)
// @Param        per_page  query  int  false  "Items per page"  default(20)
// @Success      200  {object}  models.PaginatedResponse
// @Security     BearerAuth
// @Router       /legal-decisions [get]
func (h *CoreHandler) ListLegalDecisions(c *gin.Context) {
	var p models.PaginationParams
	if err := c.ShouldBindQuery(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result, err := h.svc.ListLegalDecisions(c.Request.Context(), p)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

// GetLegalDecision godoc
// @Summary      Get a legal decision
// @Description  Get a single legal decision by ID
// @Tags         Legal Decisions
// @Produce      json
// @Param        id   path  string  true  "Legal Decision ID"
// @Success      200  {object}  models.LegalDecision
// @Failure      404  {object}  map[string]interface{}
// @Security     BearerAuth
// @Router       /legal-decisions/{id} [get]
func (h *CoreHandler) GetLegalDecision(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	item, err := h.svc.GetLegalDecision(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if item == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}

// CreateLegalDecision godoc
// @Summary      Create a legal decision
// @Description  Create a new legal decision
// @Tags         Legal Decisions
// @Accept       json
// @Produce      json
// @Param        body  body  models.LegalDecisionRequest  true  "Legal Decision data"
// @Success      201   {object}  models.LegalDecision
// @Security     BearerAuth
// @Router       /legal-decisions [post]
func (h *CoreHandler) CreateLegalDecision(c *gin.Context) {
	var req models.LegalDecisionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item, err := h.svc.CreateLegalDecision(c.Request.Context(), req, getUserIDFromCtx(c))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, item)
}

// UpdateLegalDecision godoc
// @Summary      Update a legal decision
// @Description  Update an existing legal decision
// @Tags         Legal Decisions
// @Accept       json
// @Produce      json
// @Param        id    path  string  true  "Legal Decision ID"
// @Param        body  body  models.LegalDecisionRequest  true  "Legal Decision data"
// @Success      200   {object}  models.LegalDecision
// @Security     BearerAuth
// @Router       /legal-decisions/{id} [put]
func (h *CoreHandler) UpdateLegalDecision(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	var req models.LegalDecisionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item, err := h.svc.UpdateLegalDecision(c.Request.Context(), id, req, getUserIDFromCtx(c))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, item)
}

// DeleteLegalDecision godoc
// @Summary      Delete a legal decision
// @Description  Soft-delete a legal decision
// @Tags         Legal Decisions
// @Param        id   path  string  true  "Legal Decision ID"
// @Success      200  {object}  map[string]interface{}
// @Security     BearerAuth
// @Router       /legal-decisions/{id} [delete]
func (h *CoreHandler) DeleteLegalDecision(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	if err := h.svc.DeleteLegalDecision(c.Request.Context(), id, getUserIDFromCtx(c)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

// ListLocations godoc
// @Summary      List locations
// @Description  Get paginated list of locations
// @Tags         Locations
// @Produce      json
// @Param        page      query  int  false  "Page number"  default(1)
// @Param        per_page  query  int  false  "Items per page"  default(20)
// @Success      200  {object}  models.PaginatedResponse
// @Security     BearerAuth
// @Router       /locations [get]
func (h *CoreHandler) ListLocations(c *gin.Context) {
	var p models.PaginationParams
	if err := c.ShouldBindQuery(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result, err := h.svc.ListLocations(c.Request.Context(), p)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

// GetLocation godoc
// @Summary      Get a location
// @Description  Get a single location by ID
// @Tags         Locations
// @Produce      json
// @Param        id   path  string  true  "Location ID"
// @Success      200  {object}  models.Location
// @Failure      404  {object}  map[string]interface{}
// @Security     BearerAuth
// @Router       /locations/{id} [get]
func (h *CoreHandler) GetLocation(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	item, err := h.svc.GetLocation(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if item == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}

// CreateLocation godoc
// @Summary      Create a location
// @Description  Create a new location
// @Tags         Locations
// @Accept       json
// @Produce      json
// @Param        body  body  models.LocationRequest  true  "Location data"
// @Success      201   {object}  models.Location
// @Security     BearerAuth
// @Router       /locations [post]
func (h *CoreHandler) CreateLocation(c *gin.Context) {
	var req models.LocationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item, err := h.svc.CreateLocation(c.Request.Context(), req, getUserIDFromCtx(c))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, item)
}

// UpdateLocation godoc
// @Summary      Update a location
// @Description  Update an existing location
// @Tags         Locations
// @Accept       json
// @Produce      json
// @Param        id    path  string  true  "Location ID"
// @Param        body  body  models.LocationRequest  true  "Location data"
// @Success      200   {object}  models.Location
// @Security     BearerAuth
// @Router       /locations/{id} [put]
func (h *CoreHandler) UpdateLocation(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	var req models.LocationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item, err := h.svc.UpdateLocation(c.Request.Context(), id, req, getUserIDFromCtx(c))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, item)
}

// DeleteLocation godoc
// @Summary      Delete a location
// @Description  Soft-delete a location
// @Tags         Locations
// @Param        id   path  string  true  "Location ID"
// @Success      200  {object}  map[string]interface{}
// @Security     BearerAuth
// @Router       /locations/{id} [delete]
func (h *CoreHandler) DeleteLocation(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	if err := h.svc.DeleteLocation(c.Request.Context(), id, getUserIDFromCtx(c)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

// ListFunctions godoc
// @Summary      List functions
// @Description  Get paginated list of functions
// @Tags         Functions
// @Produce      json
// @Param        page      query  int  false  "Page number"  default(1)
// @Param        per_page  query  int  false  "Items per page"  default(20)
// @Success      200  {object}  models.PaginatedResponse
// @Security     BearerAuth
// @Router       /functions [get]
func (h *CoreHandler) ListFunctions(c *gin.Context) {
	var p models.PaginationParams
	if err := c.ShouldBindQuery(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result, err := h.svc.ListFunctions(c.Request.Context(), p)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

// GetFunction godoc
// @Summary      Get a function
// @Description  Get a single function by ID
// @Tags         Functions
// @Produce      json
// @Param        id   path  string  true  "Function ID"
// @Success      200  {object}  models.Function
// @Failure      404  {object}  map[string]interface{}
// @Security     BearerAuth
// @Router       /functions/{id} [get]
func (h *CoreHandler) GetFunction(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	item, err := h.svc.GetFunction(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if item == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}

// CreateFunction godoc
// @Summary      Create a function
// @Description  Create a new function
// @Tags         Functions
// @Accept       json
// @Produce      json
// @Param        body  body  models.FunctionRequest  true  "Function data"
// @Success      201   {object}  models.Function
// @Security     BearerAuth
// @Router       /functions [post]
func (h *CoreHandler) CreateFunction(c *gin.Context) {
	var req models.FunctionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item, err := h.svc.CreateFunction(c.Request.Context(), req, getUserIDFromCtx(c))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, item)
}

// UpdateFunction godoc
// @Summary      Update a function
// @Description  Update an existing function
// @Tags         Functions
// @Accept       json
// @Produce      json
// @Param        id    path  string  true  "Function ID"
// @Param        body  body  models.FunctionRequest  true  "Function data"
// @Success      200   {object}  models.Function
// @Security     BearerAuth
// @Router       /functions/{id} [put]
func (h *CoreHandler) UpdateFunction(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	var req models.FunctionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item, err := h.svc.UpdateFunction(c.Request.Context(), id, req, getUserIDFromCtx(c))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, item)
}

// DeleteFunction godoc
// @Summary      Delete a function
// @Description  Soft-delete a function
// @Tags         Functions
// @Param        id   path  string  true  "Function ID"
// @Success      200  {object}  map[string]interface{}
// @Security     BearerAuth
// @Router       /functions/{id} [delete]
func (h *CoreHandler) DeleteFunction(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	if err := h.svc.DeleteFunction(c.Request.Context(), id, getUserIDFromCtx(c)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

// ListZoningBlocks godoc
// @Summary      List zoning blocks
// @Description  Get paginated list of zoning blocks
// @Tags         Zoning Blocks
// @Produce      json
// @Param        page      query  int  false  "Page number"  default(1)
// @Param        per_page  query  int  false  "Items per page"  default(20)
// @Success      200  {object}  models.PaginatedResponse
// @Security     BearerAuth
// @Router       /zoning-blocks [get]
func (h *CoreHandler) ListZoningBlocks(c *gin.Context) {
	var p models.PaginationParams
	if err := c.ShouldBindQuery(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result, err := h.svc.ListZoningBlocks(c.Request.Context(), p)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

// GetZoningBlock godoc
// @Summary      Get a zoning block
// @Description  Get a single zoning block by ID
// @Tags         Zoning Blocks
// @Produce      json
// @Param        id   path  string  true  "Zoning Block ID"
// @Success      200  {object}  models.ZoningBlock
// @Failure      404  {object}  map[string]interface{}
// @Security     BearerAuth
// @Router       /zoning-blocks/{id} [get]
func (h *CoreHandler) GetZoningBlock(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	item, err := h.svc.GetZoningBlock(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if item == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}

// CreateZoningBlock godoc
// @Summary      Create a zoning block
// @Description  Create a new zoning block
// @Tags         Zoning Blocks
// @Accept       json
// @Produce      json
// @Param        body  body  models.ZoningBlockRequest  true  "Zoning Block data"
// @Success      201   {object}  models.ZoningBlock
// @Security     BearerAuth
// @Router       /zoning-blocks [post]
func (h *CoreHandler) CreateZoningBlock(c *gin.Context) {
	var req models.ZoningBlockRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item, err := h.svc.CreateZoningBlock(c.Request.Context(), req, getUserIDFromCtx(c))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, item)
}

// UpdateZoningBlock godoc
// @Summary      Update a zoning block
// @Description  Update an existing zoning block
// @Tags         Zoning Blocks
// @Accept       json
// @Produce      json
// @Param        id    path  string  true  "Zoning Block ID"
// @Param        body  body  models.ZoningBlockRequest  true  "Zoning Block data"
// @Success      200   {object}  models.ZoningBlock
// @Security     BearerAuth
// @Router       /zoning-blocks/{id} [put]
func (h *CoreHandler) UpdateZoningBlock(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	var req models.ZoningBlockRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item, err := h.svc.UpdateZoningBlock(c.Request.Context(), id, req, getUserIDFromCtx(c))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, item)
}

// DeleteZoningBlock godoc
// @Summary      Delete a zoning block
// @Description  Soft-delete a zoning block
// @Tags         Zoning Blocks
// @Param        id   path  string  true  "Zoning Block ID"
// @Success      200  {object}  map[string]interface{}
// @Security     BearerAuth
// @Router       /zoning-blocks/{id} [delete]
func (h *CoreHandler) DeleteZoningBlock(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid ID format"})
		return
	}
	if err := h.svc.DeleteZoningBlock(c.Request.Context(), id, getUserIDFromCtx(c)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}
