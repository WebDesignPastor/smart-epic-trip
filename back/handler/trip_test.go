package handler

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func newTestContext(method, path string, body string) (echo.Context, *httptest.ResponseRecorder) {
	e := echo.New()
	req := httptest.NewRequest(method, path, strings.NewReader(body))
	rec := httptest.NewRecorder()
	return e.NewContext(req, rec), rec
}

func TestGetAllByUser(t *testing.T) {
	handler := &Handler{}

	userID := "1"
	requestBody := `{"userId":"` + userID + `"}`

	ctx, rec := newTestContext(http.MethodPost, "/trips/user", requestBody)

	err := handler.GetAllByUser(ctx)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, rec.Code)
}

func TestCreateTrip(t *testing.T) {
	handler := &Handler{}

	requestBody := `{
		"trip": {
			"departure": "Marseille",
			"arrival": "Nice",
			"departureDate": "2024-04-15T10:00:00Z",
			"arrivalDate": "2024-04-15T18:00:00Z",
			"user_id": 1
		}
	}`

	ctx, rec := newTestContext(http.MethodPost, "/trips", requestBody)

	err := handler.CreateTrip(ctx)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, rec.Code)
}

func TestSaveTrip(t *testing.T) {
	handler := &Handler{}

	requestBody := `{
		"departure": "Marseille",
		"arrival": "Nice",
		"departureDate": "2024-04-15T10:00:00Z",
		"arrivalDate": "2024-04-15T18:00:00Z",
		"user_id": 1,
		"places": [
			{
				"name": "Place 1",
				"latitude": 40.7128,
				"longitude": -74.0060,
				"GoogleApiId": "google_api_id_1"
			},
			{
				"name": "Place 2",
				"latitude": 34.0522,
				"longitude": -118.2437,
				"GoogleApiId": "google_api_id_2"
			}
		]
	}`

	ctx, rec := newTestContext(http.MethodPost, "/trips", requestBody)

	err := handler.saveTrip(ctx)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, rec.Code)
}
