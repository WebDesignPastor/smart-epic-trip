package handler

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetAllByUser(t *testing.T) {
	// Create a new instance of the handler
	handler := &Handler{} // Assuming you have initialized your handler struct somewhere

	// Define a user ID for testing
	userID := "1"

	// Create a sample request body containing the user ID
	requestBody := `{"userId":"` + userID + `"}`

	// Create a new HTTP request with the sample body
	req := httptest.NewRequest(http.MethodPost, "/trips/user", strings.NewReader(requestBody))

	// Create a new HTTP response recorder
	rec := httptest.NewRecorder()

	// Create a new echo context
	e := echo.New()
	ctx := e.NewContext(req, rec)

	// Call the handler function
	err := handler.GetAllByUser(ctx)

	// Check for any errors returned by the handler function
	assert.NoError(t, err)

	// Check the response status code
	assert.Equal(t, http.StatusOK, rec.Code)

	// Add more assertions as needed
}

func TestCreateTrip(t *testing.T) {
	// Create a new instance of the handler
	handler := &Handler{} // Assuming you have initialized your handler struct somewhere

	// Create the request body
	requestBody := `{
		"trip": {
			"departure": "Marseille",
			"arrival": "Nice",
			"departureDate": "2024-04-15T10:00:00Z",
			"arrivalDate": "2024-04-15T18:00:00Z",
			"user_id": 1
		}
	}`

	// Create a new HTTP request with the sample body
	req := httptest.NewRequest(http.MethodPost, "/trips", strings.NewReader(requestBody))

	// Create a new HTTP response recorder
	rec := httptest.NewRecorder()

	// Create a new echo context
	e := echo.New()
	ctx := e.NewContext(req, rec)

	// Call the handler function
	err := handler.CreateTrip(ctx)

	// Check for any errors returned by the handler function
	assert.NoError(t, err)

	// Check the response status code
	assert.Equal(t, http.StatusCreated, rec.Code)

	// Add more assertions as needed
}
