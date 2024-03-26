package handler

import (
	"net/http"
	"strconv"

	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/utils"
	"github.com/labstack/echo/v4"
)

// getAllTrips handles GET request to retrieve all trips
//func (h *Handler) getAllTrips(c echo.Context) error {
//	// Retrieve all trips from the database
//	trips, err := h.tripStore.GetAll()
//	if err != nil {
//		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
//	}
//
//	// Return the trips as JSON response
//	return c.JSON(http.StatusOK, trips)
//}

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

// CreateTrip handles POST request to create a new trip
func (h *Handler) CreateTrip(c echo.Context) error {
	// Parse request body to extract trip data
	var trip model.Trip
	if err := c.Bind(&trip); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	// Create the trip in the database
	if err := h.tripStore.Create(&trip); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	// Return the created trip as JSON response
	return c.JSON(http.StatusCreated, trip)
}

// UpdateTrip handles PUT request to update an existing trip
func (h *Handler) UpdateTrip(c echo.Context) error {
	// Extract trip ID from URL parameter
	p := c.Param("id")
	tripID, err := strconv.Atoi(p)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	// Retrieve the existing trip from the database
	existingTrip, err := h.tripStore.GetByID(uint(tripID))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if existingTrip == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}

	// Parse request body to extract updated trip data
	var updatedTrip model.Trip
	if err := c.Bind(&updatedTrip); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	// Save the updated trip in the database
	if err := h.tripStore.Update(existingTrip); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	// Return the updated trip as JSON response
	return c.JSON(http.StatusOK, existingTrip)
}

// DeleteTrip handles DELETE request to delete an existing trip
func (h *Handler) DeleteTrip(c echo.Context) error {
	// Extract trip ID from URL parameter
	p := c.Param("id")
	tripID, err := strconv.Atoi(p)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	// Retrieve the existing trip from the database
	existingTrip, err := h.tripStore.GetByID(uint(tripID))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if existingTrip == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}

	// Delete the trip from the database
	if err := h.tripStore.Delete(existingTrip); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	// Return success message
	return c.JSON(http.StatusOK, utils.SuccessMessage("Trip deleted successfully"))
}
