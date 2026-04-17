package api

import (
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"github.com/BBKSDAPBD/vogelkop-data-center/internal/api/handlers"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/api/middleware"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/config"
)

func SetupRouter(cfg *config.Config) *gin.Engine {
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
		// Protected routes example
		protected := v1.Group("/protected")
		protected.Use(middleware.AuthRequired(cfg))
		{
			protected.GET("/ping", func(c *gin.Context) {
				c.JSON(200, gin.H{"message": "pong", "user_id": c.MustGet("userID")})
			})
		}
	}

	return router
}
