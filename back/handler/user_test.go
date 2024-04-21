package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestSignUpCaseSuccess(t *testing.T) {
	tearDown()
	setup()
	var (
		reqJSON = `{"user":{"username":"test42","email":"tes42t@test.com","password":"secret"}}`
	)
	req := httptest.NewRequest(echo.POST, "/api/users", strings.NewReader(reqJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	assert.NoError(t, h.SignUp(c))
	if assert.Equal(t, http.StatusCreated, rec.Code) {
		m := responseMap(rec.Body.Bytes(), "user")
		assert.Equal(t, "test42", m["username"])
		assert.Equal(t, "tes42t@test.com", m["email"])
		assert.NotEmpty(t, rec.Body.Bytes(), "token")
	}
}

func TestLoginCaseSuccess(t *testing.T) {
	tearDown()
	setup()

	var (
		reqJSON = `{"user":{"email":"user4222@test.com","password":"secret"}}`
	)
	req := httptest.NewRequest(echo.POST, "/api/users/login", strings.NewReader(reqJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	assert.NoError(t, h.Login(c))
	if assert.Equal(t, http.StatusOK, rec.Code) {
		m := responseMap(rec.Body.Bytes(), "user")
		assert.Equal(t, "user4222", m["username"])
		assert.Equal(t, "user4222@test.com", m["email"])
		assert.NotEmpty(t, rec.Body.Bytes(), "token")
	}
}

func TestGetAllCaseSuccess(t *testing.T) {
	tearDown()
	setup()

	req := httptest.NewRequest(echo.POST, "/api/users/login", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	assert.NoError(t, h.GetAll(c))
	assert.Equal(t, http.StatusOK, rec.Code)
}
