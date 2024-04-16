package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestCreatePlace(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"place":{"name":"Test Place","latitude":"123 Test St","longitude":"456 Test St", "GoogleApiId":"1"}}`
	)
	req := httptest.NewRequest(echo.POST, "/api/places", strings.NewReader(reqJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	assert.NoError(t, h.CreatePlace(c))
	if assert.Equal(t, http.StatusCreated, rec.Code) {
		m := responseMap(rec.Body.Bytes(), "place")
		assert.Equal(t, "Test Place", m["name"])
		assert.Equal(t, "123 Test St", m["latitude"])
		assert.Equal(t, "456 Test St", m["longitude"])
	}
}
