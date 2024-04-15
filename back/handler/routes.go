package handler

import (
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/router/middleware"
	"github.com/golang-jwt/jwt/v5"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

func (h *Handler) Register(v1 *echo.Group) {
	// User Routes
	g := v1.Group("/users")
	g.POST("", h.SignUp)
	g.POST("/login", h.Login)

	//define jwt config here
	config := echojwt.Config{
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(middleware.JwtCustomClaims)
		},
		SigningKey: []byte("secret"),
	}

	u := v1.Group("/users")
	// all route will using the jwt config will check for jwt
	u.Use(echojwt.WithConfig(config))
	u.GET("", h.GetAll)
	u.PUT("/:id", h.UpdateUser)

	// Trip routes
	t := v1.Group("/trips")
	t.GET("", h.GetAllByUser)
	t.GET("/:id", h.GetTrip)
	t.POST("", h.saveTrip)
	t.PUT("/:id", h.UpdateTrip)
	t.DELETE("/:id", h.DeleteTrip)

	// Place routes
	p := v1.Group("/places")
	p.POST("", h.CreatePlace)
}
