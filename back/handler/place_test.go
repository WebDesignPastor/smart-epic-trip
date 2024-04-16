package handler

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/labstack/echo/v4"
)

func TestCreatePlace(t *testing.T) {
	// Create a new instance of the handler
	handler := &Handler{} // Assuming you have initialized your handler struct somewhere

	// Create a new HTTP request
	req := httptest.NewRequest(http.MethodPost, "/places", strings.NewReader(`{"name":"Test Place","latitude":"123 Test St","longitude":"456 Test St"}`))

	// Create a new HTTP response recorder
	rec := httptest.NewRecorder()

	// Create a new echo context
	e := echo.New()
	ctx := e.NewContext(req, rec)

	// Call the handler function
	err := handler.CreatePlace(ctx)

	// Check for any errors returned by the handler function
	if err != nil {
		t.Fatalf("CreatePlace handler returned an error: %v", err)
	}

	// Check the response status code
	if rec.Code != http.StatusCreated {
		t.Errorf("Expected status code %d but got %d", http.StatusCreated, rec.Code)
	}

	// Add more assertions as needed
}
