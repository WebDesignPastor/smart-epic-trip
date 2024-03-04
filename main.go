package main

import (
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/router"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	router.UseSubNavRoute(e)

	e.Static("/css", "css")
	e.Static("/static", "static")
	e.Logger.Fatal(e.Start(":3000"))
}
