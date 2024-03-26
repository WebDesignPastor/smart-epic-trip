package handler

import "github.com/labstack/echo/v4"

func (h *Handler) Register(v1 *echo.Group) {
	// User Routes
	u := v1.Group("/users")
	u.POST("", h.SignUp)
	u.POST("/login", h.Login)
	u.PUT("/:id", h.UpdateUser)

	// Trip routes
	t := v1.Group("/trips")
	//t.GET("", h.getAllTrips)
	t.GET("/:id", h.GetTrip)
	t.POST("", h.CreateTrip)
	t.PUT("/:id", h.UpdateTrip)
	t.DELETE("/:id", h.DeleteTrip)
}
