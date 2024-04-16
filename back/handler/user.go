package handler

import (
	"net/http"
	"strconv"

	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/router/middleware"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/utils"
	"github.com/labstack/echo/v4"
)

// ListAccounts lists all existing accounts
//
//	@Summary      List accounts
//	@Description  get accounts
//	@Tags         accounts
//	@Accept       json
//	@Produce      json
//	@Security     BearerAuth
//	@Success      200  {array}   model.User
//	@Failure      422  {object}  utils.Error
//	@Router       /users [get]
func (h *Handler) GetAll(c echo.Context) error {
	var userResponses []model.User

	users, err := h.userStore.GetAll()
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	for _, user := range users {
		userResponses = append(userResponses, user)
	}

	return c.JSON(http.StatusOK, userResponses)
}

// SignUp
//
//	@Summary      Sign up
//	@Description  sign up
//	@Tags         accounts
//	@Accept       json
//	@Param        body   body   handler.userRegisterRequest   true   "Request body"
//	@Produce      json
//	@Success      201  {object}   handler.userResponse
//	@Failure      422  {object}  utils.Error
//	@Router       /users [post]
func (h *Handler) SignUp(c echo.Context) error {
	var u model.User
	req := &userRegisterRequest{}
	if err := req.bind(c, &u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	if err := h.userStore.Create(&u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	t, err := middleware.CreateJwt(int(u.ID))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	return c.JSON(http.StatusCreated, newUserResponse(&u, t))
}

// Login
//
//	@Summary      Login
//	@Description  login
//	@Tags         accounts
//	@Accept       json
//	@Param        body   body   handler.userLoginRequest   true   "Request body"
//	@Produce      json
//	@Success      201  {object}   handler.userResponse
//	@Failure      422  {object}  utils.Error
//	@Router       /users/login [post]
func (h *Handler) Login(c echo.Context) error {
	req := &userLoginRequest{}
	if err := req.bind(c); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	u, err := h.userStore.GetByEmail(req.User.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if u == nil {
		return c.JSON(http.StatusForbidden, utils.AccessForbidden())
	}

	t, err := middleware.CreateJwt(int(u.ID))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	return c.JSON(http.StatusOK, newUserResponse(u, t))
}

// Update
//
//	@Summary      Update
//	@Description  update
//	@Tags         accounts
//	@Accept       json
//	@Param        id     path    integer   true        "Account ID to update"
//	@Param        body   body   handler.userUpdateRequest   true   "Request body"
//	@Produce      json
//	@Security     BearerAuth
//	@Success      201  {object}   handler.userResponse
//	@Failure      422  {object}  utils.Error
//	@Router       /users/{id} [put]
func (h *Handler) UpdateUser(c echo.Context) error {
	p := c.Param("id") // get id from request param
	id, err := strconv.Atoi(p)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	jwt_id, err := middleware.ExtractId(c) // get id from jwt
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	if jwt_id != id { // check if jwt_id different from param id
		return c.JSON(http.StatusForbidden, utils.AccessForbidden())
	}

	// Retrieve user by ID from the database
	u, err := h.userStore.GetByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if u == nil {
		return c.JSON(http.StatusNotFound, utils.NotFound())
	}

	// Bind request body to update user data
	req := newUserUpdateRequest()
	req.populate(u)
	if err := req.bind(c, u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	// Check if the request contains a new password
	if req.User.Password != "" {
		// Hash the new password
		hashedPassword, err := utils.HashPassword(req.User.Password)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, utils.NewError(err))
		}
		// Update the user's password with the hashed password
		u.Password = hashedPassword
	}

	// Update the user in the database
	if err := h.userStore.Update(u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}
	return c.JSON(http.StatusOK, updateUserResponse(u))
}

// Delete
//
//	@Summary      Delete
//	@Description  delete
//	@Tags         accounts
//	@Accept       json
//	@Produce      json
//	@Param        id     path    integer   true        "Account ID to delete"
//	@Security     BearerAuth
//	@Success      204
//	@Failure      422  {object}  utils.Error
//	@Router       /users/{id} [delete]
func (h *Handler) DeleteUser(c echo.Context) error {

	p := c.QueryParam("id")
	id, err := strconv.Atoi(p)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	jwt_id, err := middleware.ExtractId(c) // get id from jwt
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	if jwt_id != id { // check if jwt_id different from param id
		return c.JSON(http.StatusForbidden, utils.AccessForbidden())
	}

	u, err := h.userStore.GetByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if u == nil {
		return c.JSON(http.StatusForbidden, utils.AccessForbidden())
	}

	if err := h.userStore.Delete(u); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.AccessForbidden())
	}

	return c.NoContent(http.StatusNoContent)

}
