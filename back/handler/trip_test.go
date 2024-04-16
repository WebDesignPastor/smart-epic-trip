package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestGetAllByUser(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"user_id": 1}`
	)
	req := httptest.NewRequest(echo.POST, "/api/trips", strings.NewReader(reqJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	assert.NoError(t, h.GetAllByUser(c))
	if assert.Equal(t, http.StatusOK, rec.Code) {
		//m := responseMap(rec.Body.Bytes(), "place")
		//assert.Equal(t, "Test Place", m["name"])
		//assert.Equal(t, "123 Test St", m["latitude"])
		//assert.Equal(t, "456 Test St", m["longitude"])
	}
}

//func TestCreateTrip(t *testing.T) {
//	tearDown()
//	setup()
//	var (
//		reqJSON = `{"trip": { "departure": "Marseille", "arrival": "Nice", "departureDate": "2024-04-15T10:00:00Z", "arrivalDate": "2024-04-15T18:00:00Z", "user_id": 1}}`
//	)
//	req := httptest.NewRequest(echo.POST, "/api/trips", strings.NewReader(reqJSON))
//	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
//	rec := httptest.NewRecorder()
//	c := e.NewContext(req, rec)
//	assert.NoError(t, h.CreateTrip(c))
//	if assert.Equal(t, http.StatusCreated, rec.Code) {
//		m := responseMap(rec.Body.Bytes(), "trip")
//		assert.Equal(t, "Marseille", m["departure"])
//		assert.Equal(t, "Nice", m["arrival"])
//		assert.Equal(t, "2024-04-15T10:00:00Z", m["departureDate"])
//		assert.Equal(t, "2024-04-15T18:00:00Z", m["arrivalDate"])
//		assert.Equal(t, float64(1), m["user_id"])
//	}
//}

func TestSaveTrip(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"trip":{ "departure": "Marseille", "arrival": "Nice", "departureDate": "2024-04-15T10:00:00Z", "arrivalDate": "2024-04-15T18:00:00Z", "user_id": 1, "places": [ { "name": "Place 1", "latitude": 40.7128, "longitude": -74.0060, "GoogleApiId": "google_api_id_1" }, { "name": "Place 2", "latitude": 34.0522, "longitude": -118.2437, "GoogleApiId": "google_api_id_2" } ] }}`
	)

	req := httptest.NewRequest(echo.POST, "/api/trips", strings.NewReader(reqJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	assert.NoError(t, h.saveTrip(c))
	if assert.Equal(t, http.StatusCreated, rec.Code) {
		m := responseMap(rec.Body.Bytes(), "trip")
		assert.Equal(t, "Marseille", m["departure"])
		assert.Equal(t, "Nice", m["arrival"])
		assert.Equal(t, "2024-04-15T10:00:00Z", m["departureDate"])
		assert.Equal(t, "2024-04-15T18:00:00Z", m["arrivalDate"])
		assert.Equal(t, float64(1), m["user_id"])
	}
}

//func TestSaveTrip(t *testing.T) {
//	handler := &Handler{}
//
//	requestBody := `{
//		"departure": "Marseille",
//		"arrival": "Nice",
//		"departureDate": "2024-04-15T10:00:00Z",
//		"arrivalDate": "2024-04-15T18:00:00Z",
//		"user_id": 1,
//		"places": [
//			{
//				"name": "Place 1",
//				"latitude": 40.7128,
//				"longitude": -74.0060,
//				"GoogleApiId": "google_api_id_1"
//			},
//			{
//				"name": "Place 2",
//				"latitude": 34.0522,
//				"longitude": -118.2437,
//				"GoogleApiId": "google_api_id_2"
//			}
//		]
//	}`
//
//	ctx, rec := newTestContext(http.MethodPost, "/trips", requestBody)
//
//	err := handler.saveTrip(ctx)
//
//	assert.NoError(t, err)
//	assert.Equal(t, http.StatusCreated, rec.Code)
//}
