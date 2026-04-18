package api

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"github.com/BBKSDAPBD/vogelkop-data-center/internal/api/handlers"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/api/middleware"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/config"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/services"
)

func SetupRouter(cfg *config.Config, dbPool *pgxpool.Pool) *gin.Engine {
	if cfg.AppEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	router.Use(middleware.CORS(cfg))

	router.GET("/health", handlers.HealthCheck)

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	v1 := router.Group("/api/v1")
	{
		authService := services.NewAuthService(dbPool, cfg)
		authHandler := handlers.NewAuthHandler(cfg, authService)

		auth := v1.Group("/auth")
		{
			auth.GET("/google/login", authHandler.GoogleLogin)
			auth.GET("/google/callback", authHandler.GoogleCallback)
			auth.POST("/logout", authHandler.Logout)
		}

		authProtected := v1.Group("/auth")
		authProtected.Use(middleware.AuthRequired(cfg))
		{
			authProtected.GET("/me", authHandler.GetMe)
		}

		coreService := services.NewCoreService(dbPool)
		coreHandler := handlers.NewCoreHandler(coreService)

		readOnly := v1.Group("")
		readOnly.Use(middleware.AuthRequired(cfg))
		readOnly.Use(middleware.RoleRequired("admin", "editor", "viewer"))
		{
			readOnly.GET("/conservation-areas", coreHandler.ListConservationAreas)
			readOnly.GET("/conservation-areas/:id", coreHandler.GetConservationArea)
			readOnly.GET("/legal-decisions", coreHandler.ListLegalDecisions)
			readOnly.GET("/legal-decisions/:id", coreHandler.GetLegalDecision)
			readOnly.GET("/locations", coreHandler.ListLocations)
			readOnly.GET("/locations/:id", coreHandler.GetLocation)
			readOnly.GET("/functions", coreHandler.ListFunctions)
			readOnly.GET("/functions/:id", coreHandler.GetFunction)
			readOnly.GET("/zoning-blocks", coreHandler.ListZoningBlocks)
			readOnly.GET("/zoning-blocks/:id", coreHandler.GetZoningBlock)
		}

		writeAccess := v1.Group("")
		writeAccess.Use(middleware.AuthRequired(cfg))
		writeAccess.Use(middleware.RoleRequired("admin", "editor"))
		{
			writeAccess.POST("/conservation-areas", coreHandler.CreateConservationArea)
			writeAccess.PUT("/conservation-areas/:id", coreHandler.UpdateConservationArea)
			writeAccess.POST("/legal-decisions", coreHandler.CreateLegalDecision)
			writeAccess.PUT("/legal-decisions/:id", coreHandler.UpdateLegalDecision)
			writeAccess.POST("/locations", coreHandler.CreateLocation)
			writeAccess.PUT("/locations/:id", coreHandler.UpdateLocation)
			writeAccess.POST("/functions", coreHandler.CreateFunction)
			writeAccess.PUT("/functions/:id", coreHandler.UpdateFunction)
			writeAccess.POST("/zoning-blocks", coreHandler.CreateZoningBlock)
			writeAccess.PUT("/zoning-blocks/:id", coreHandler.UpdateZoningBlock)
		}

		adminAccess := v1.Group("")
		adminAccess.Use(middleware.AuthRequired(cfg))
		adminAccess.Use(middleware.RoleRequired("admin"))
		{
			adminAccess.DELETE("/conservation-areas/:id", coreHandler.DeleteConservationArea)
			adminAccess.DELETE("/legal-decisions/:id", coreHandler.DeleteLegalDecision)
			adminAccess.DELETE("/locations/:id", coreHandler.DeleteLocation)
			adminAccess.DELETE("/functions/:id", coreHandler.DeleteFunction)
			adminAccess.DELETE("/zoning-blocks/:id", coreHandler.DeleteZoningBlock)
		}
	}

	return router
}
