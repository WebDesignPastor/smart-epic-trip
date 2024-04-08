package handler

import (
	"net/http"
	//"strconv"

	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/utils"
	"github.com/labstack/echo/v4"
)

func (h *Handler) CreatePlace(c echo.Context) error {
	var p model.Place
	req := &newPlaceRequest{}
	if err := req.bind(c, &p); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	if err := h.placeStore.Create(&p); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	return c.JSON(http.StatusCreated, newPlaceResponse(&p))
}
