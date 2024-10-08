package handler

import (
	"net/http"
	"strconv"

	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/router/middleware"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/utils"
	"github.com/labstack/echo/v4"
)

func (h *Handler) GetAllByUser(c echo.Context) error {
	var req getAllTripsRequest

	jwt_id, err := middleware.ExtractId(c) // get id from jwt
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	req.UserId = uint(jwt_id)

	if err := req.bind(c); err != nil {
		return c.JSON(http.StatusBadRequest, utils.NewError(err))
	}

	// Retrieve all trips from the database for a User
	trips, err := h.tripStore.GetAllByUser(req.UserId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	// Return the trips as JSON response
	return c.JSON(http.StatusOK, trips)
}

func (h *Handler) saveTrip(c echo.Context) error {
	var t model.Trip
	var req newTripRequest

	jwt_id, err := middleware.ExtractId(c) // get id from jwt
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	req.Trip.UserId = uint(jwt_id)

	if err := req.bind(c, &t); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	if err := h.tripStore.Create(&t); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	for _, placeReq := range req.Places {
		place, err := h.placeStore.GetByName(placeReq.Name)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, utils.NewError(err))
		}
		if place == nil {
			newPlace := model.Place{
				Name:        placeReq.Name,
				Latitude:    placeReq.Latitude,
				Longitude:   placeReq.Longitude,
				GoogleApiId: placeReq.GoogleApiId,
			}
			if err := h.placeStore.Create(&newPlace); err != nil {
				return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
			}
			// Link the new place to the trip
			if err := h.tripStore.LinkPlaceToTrip(t.ID, newPlace.ID); err != nil {
				return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
			}
		} else {
			// If the place exists, link it to the trip
			if err := h.tripStore.LinkPlaceToTrip(t.ID, place.ID); err != nil {
				return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
			}
		}

	}

	return c.JSON(http.StatusCreated, newTripResponse(&t))
}

// GetTrip handles GET request to retrieve a specific trip by ID
func (h *Handler) GetTrip(c echo.Context) error {
	// Extract trip ID from URL parameter
	p := c.Param("id")
	tripID, err := strconv.Atoi(p)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	// Retrieve the trip from the database
	trip, err := h.tripStore.GetByID(uint(tripID))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if trip == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}

	// Return the trip as JSON response
	return c.JSON(http.StatusOK, trip)
}

//func (h *Handler) CreateTrip(c echo.Context) error {
//	var t model.Trip
//	req := &newTripRequest{}
//	if err := req.bind(c, &t); err != nil {
//		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
//	}
//
//	if err := h.tripStore.Create(&t); err != nil {
//		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
//	}
//
//	return c.JSON(http.StatusCreated, newTripResponse(&t))
//}
