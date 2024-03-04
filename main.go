package main

import (
	"context"

	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/templates"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	// main menu
	component := templates.Index()

	e.GET("/", func(c echo.Context) error {
		return component.Render(context.Background(), c.Response().Writer)
	})
	e.Static("/css", "css")
	e.Static("/static", "static")
	e.Logger.Fatal(e.Start(":3000"))
}
