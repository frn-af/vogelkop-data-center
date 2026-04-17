package main

import (
	"log"

	_ "github.com/BBKSDAPBD/vogelkop-data-center/api/docs" // Swagger docs generated
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/api"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/config"
	"github.com/BBKSDAPBD/vogelkop-data-center/internal/db"
)

// @title           Vogelkop Data Center API
// @version         1.0
// @description     API Server for Vogelkop Data Center management
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.email  support@vogelkop.org

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8080
// @BasePath  /api/v1

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization

func main() {
	// Load config
	cfg := config.LoadConfig()

	// Initialize Database connection
	if err := db.InitPostgres(cfg); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer db.ClosePostgres()

	// Initialize Redis connection
	if err := db.InitRedis(cfg); err != nil {
		log.Fatalf("Failed to initialize redis: %v", err)
	}
	defer db.CloseRedis()

	// Run migrations
	if err := db.RunMigrations(cfg, "migrations"); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Setup Gin router
	router := api.SetupRouter(cfg, db.PostgresPool)

	// Start server
	log.Printf("Starting server on port %s...", cfg.AppPort)
	if err := router.Run(":" + cfg.AppPort); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
