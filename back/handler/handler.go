package handler

import "github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/user"

type Handler struct {
	userStore user.Store
}

func NewHandler(us user.Store) *Handler {
	return &Handler{
		userStore: us,
	}
}
