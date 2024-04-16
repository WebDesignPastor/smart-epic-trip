package handler

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func newTestEchoContext(method, path string, body string) (echo.Context, *httptest.ResponseRecorder) {
	e := echo.New()
	req := httptest.NewRequest(method, path, strings.NewReader(body))
	rec := httptest.NewRecorder()
	return e.NewContext(req, rec), rec
}

func TestCreatePlace(t *testing.T) {
	handler := &Handler{}

	requestBody := `{"name":"Test Place","latitude":"123 Test St","longitude":"456 Test St"}`

	ctx, rec := newTestEchoContext(http.MethodPost, "/places", requestBody)

	err := handler.CreatePlace(ctx)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, rec.Code)
}
