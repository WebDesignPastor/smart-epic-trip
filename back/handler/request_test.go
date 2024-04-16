package handler

//import (
//	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"
//	"net/http"
//	"net/http/httptest"
//	"strings"
//	"testing"
//	"time"
//
//	"github.com/labstack/echo/v4"
//	"github.com/stretchr/testify/assert"
//)
//
//func TestUserRegisterRequestBind(t *testing.T) {
//	req := &userRegisterRequest{}
//
//	c := newRequestTestContext(http.MethodPost, "/", `{"user":{"username":"testuser","email":"test@example.com","password":"testpassword"}}`)
//	user := &model.User{}
//
//	err := req.bind(c, user)
//
//	assert.NoError(t, err)
//	assert.Equal(t, "testuser", user.Username)
//	assert.Equal(t, "test@example.com", user.Email)
//	// We are not checking the hashed password for simplicity in this test
//}
//
//func TestNewTripRequestBind(t *testing.T) {
//	req := &newTripRequest{}
//
//	departureDate, _ := time.Parse(time.RFC3339, "2024-04-15T10:00:00Z")
//	arrivalDate, _ := time.Parse(time.RFC3339, "2024-04-15T18:00:00Z")
//
//	c := newRequestTestContext(http.MethodPost, "/", `{"trip":{"departure":"Marseille","arrival":"Nice","departureDate":"2024-04-15T10:00:00Z","arrivalDate":"2024-04-15T18:00:00Z","user_id":1}}`)
//	trip := &model.Trip{}
//
//	err := req.bind(c, trip)
//
//	assert.NoError(t, err)
//	assert.Equal(t, "Marseille", trip.Departure)
//	assert.Equal(t, "Nice", trip.Arrival)
//	assert.Equal(t, departureDate, trip.DepartureDate)
//	assert.Equal(t, arrivalDate, trip.ArrivalDate)
//	assert.Equal(t, uint(1), trip.UserId)
//}
//
//func TestNewPlaceRequestBind(t *testing.T) {
//	req := &newPlaceRequest{}
//
//	c := newRequestTestContext(http.MethodPost, "/", `{"place":{"name":"Test Place","latitude":"123 Test St","longitude":"456 Test St","GoogleApiId":"google_api_id"}}`)
//	place := &model.Place{}
//
//	err := req.bind(c, place)
//
//	assert.NoError(t, err)
//	assert.Equal(t, "Test Place", place.Name)
//	assert.Equal(t, "123 Test St", place.Latitude)
//	assert.Equal(t, "456 Test St", place.Longitude)
//	assert.Equal(t, "google_api_id", place.GoogleApiId)
//}
//
//func TestUserLoginRequestBind(t *testing.T) {
//	req := &userLoginRequest{}
//
//	c := newRequestTestContext(http.MethodPost, "/", `{"user":{"email":"test@example.com","password":"testpassword"}}`)
//	err := req.bind(c)
//
//	assert.NoError(t, err)
//	assert.Equal(t, "test@example.com", req.User.Email)
//	assert.Equal(t, "testpassword", req.User.Password)
//}
//
//func TestUserUpdateRequestBind(t *testing.T) {
//	req := &userUpdateRequest{}
//
//	c := newRequestTestContext(http.MethodPost, "/", `{"user":{"username":"testuser","email":"test@example.com","password":"testpassword"}}`)
//	user := &model.User{}
//
//	err := req.bind(c, user)
//
//	assert.NoError(t, err)
//	assert.Equal(t, "testuser", req.User.Username)
//	assert.Equal(t, "test@example.com", req.User.Email)
//	assert.Equal(t, "testpassword", req.User.Password)
//}
//
//func newRequestTestContext(method, path string, body string) echo.Context {
//	e := echo.New()
//	req := httptest.NewRequest(method, path, strings.NewReader(body))
//	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
//	rec := httptest.NewRecorder()
//	return e.NewContext(req, rec)
//}
