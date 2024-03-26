package handler

import "github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/user";
import "github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/trip";

type Handler struct {
	userStore user.Store
	tripStore trip.Store
}

func NewHandler(us user.Store, ts trip.Store) *Handler {
	return &Handler{
		userStore: us,
		tripStore: ts,
	}
}
