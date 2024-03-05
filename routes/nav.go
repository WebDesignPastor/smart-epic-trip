package routes

import (
	"context"
	"log"
	"os"

	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/templates"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func UseSubNavRoute(e *echo.Echo) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	apiKey := os.Getenv("GOOGLE_MAPS_API_KEY")
	log.Printf("Loaded API key: %s\n", apiKey)
	if apiKey == "" {
		log.Println("Warning: GOOGLE_MAPS_API_KEY environment variable is not set.")
	}

	// main menu
	e.GET("/", func(c echo.Context) error {
		ctx := context.WithValue(context.Background(), "APIKey", apiKey)
		log.Printf("Loaded API key: %s\n", apiKey)

		return templates.Index(apiKey).Render(ctx, c.Response().Writer)
	})
}
