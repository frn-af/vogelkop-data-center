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

	// Global Middleware
	router.Use(middleware.CORS())

	// Health Check
	router.GET("/health", handlers.HealthCheck)

	// Swagger documentation route
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// API Group V1
	v1 := router.Group("/api/v1")
	{
		// Auth Routes
		authService := services.NewAuthService(dbPool, cfg)
		authHandler := handlers.NewAuthHandler(cfg, authService)

		auth := v1.Group("/auth")
		{
			auth.GET("/google/login", authHandler.GoogleLogin)
			auth.GET("/google/callback", authHandler.GoogleCallback)
		}

		coreService := services.NewCoreService(dbPool)
		coreHandler := handlers.NewCoreHandler(coreService)

		protected := v1.Group("")
		protected.Use(middleware.AuthRequired(cfg))
		{
			areas := protected.Group("/conservation-areas")
			{
				areas.GET("", coreHandler.ListConservationAreas)
				areas.GET("/:id", coreHandler.GetConservationArea)
				areas.POST("", coreHandler.CreateConservationArea)
				areas.PUT("/:id", coreHandler.UpdateConservationArea)
				areas.DELETE("/:id", coreHandler.DeleteConservationArea)
			}

			decisions := protected.Group("/legal-decisions")
			{
				decisions.GET("", coreHandler.ListLegalDecisions)
				decisions.GET("/:id", coreHandler.GetLegalDecision)
				decisions.POST("", coreHandler.CreateLegalDecision)
				decisions.PUT("/:id", coreHandler.UpdateLegalDecision)
				decisions.DELETE("/:id", coreHandler.DeleteLegalDecision)
			}

			locations := protected.Group("/locations")
			{
				locations.GET("", coreHandler.ListLocations)
				locations.GET("/:id", coreHandler.GetLocation)
				locations.POST("", coreHandler.CreateLocation)
				locations.PUT("/:id", coreHandler.UpdateLocation)
				locations.DELETE("/:id", coreHandler.DeleteLocation)
			}

			functions := protected.Group("/functions")
			{
				functions.GET("", coreHandler.ListFunctions)
				functions.GET("/:id", coreHandler.GetFunction)
				functions.POST("", coreHandler.CreateFunction)
				functions.PUT("/:id", coreHandler.UpdateFunction)
				functions.DELETE("/:id", coreHandler.DeleteFunction)
			}

			blocks := protected.Group("/zoning-blocks")
			{
				blocks.GET("", coreHandler.ListZoningBlocks)
				blocks.GET("/:id", coreHandler.GetZoningBlock)
				blocks.POST("", coreHandler.CreateZoningBlock)
				blocks.PUT("/:id", coreHandler.UpdateZoningBlock)
				blocks.DELETE("/:id", coreHandler.DeleteZoningBlock)
			}
		}
	}

	return router
}
