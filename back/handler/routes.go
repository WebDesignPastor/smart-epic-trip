package handler

import "github.com/labstack/echo/v4"

func (h *Handler) Register(v1 *echo.Group) {
	// User Routes
	u := v1.Group("/users")
	u.GET("", h.GetAll)
	u.POST("", h.SignUp)
	u.POST("/login", h.Login)
	u.PUT("/:id", h.UpdateUser)
<<<<<<< HEAD

	// Trip routes
	t := v1.Group("/trips")
	//t.GET("", h.getAllTrips)
	t.GET("/:id", h.GetTrip)
	t.POST("", h.CreateTrip)
	t.PUT("/:id", h.UpdateTrip)
	t.DELETE("/:id", h.DeleteTrip)
=======
>>>>>>> 3c02e375d908fbdfd69176e9559052ee4be01d58
}
