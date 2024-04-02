package handler

import (
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/place"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/trip"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/user"
)

type Handler struct {
	userStore  user.Store
	tripStore  trip.Store
	placeStore place.Store
}

func NewHandler(us user.Store, ts trip.Store, ps place.Store) *Handler {
	return &Handler{
		userStore:  us,
		tripStore:  ts,
		placeStore: ps,
	}
}
