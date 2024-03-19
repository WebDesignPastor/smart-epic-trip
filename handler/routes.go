package handler

import "github.com/labstack/echo/v4"

func (h *Handler) Register(v1 *echo.Group) {
	u := v1.Group("/users")
	u.POST("", h.SignUp)
	u.POST("/login", h.Login)
	u.PUT("", h.UpdateUser)
}
