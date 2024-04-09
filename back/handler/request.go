package handler

import (
	"errors"

	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"
	"github.com/labstack/echo/v4"
)

type userUpdateRequest struct {
	User struct {
		Username string `json:"username"`
		Email    string `json:"email" validate:"email"`
		Password string `json:"password"`
	} `json:"user"`
}

func newUserUpdateRequest() *userUpdateRequest {
	return new(userUpdateRequest)
}

func (r *userUpdateRequest) populate(u *model.User) {
	r.User.Username = u.Username
	r.User.Email = u.Email
	r.User.Password = u.Password
}

func (r *userUpdateRequest) bind(c echo.Context, u *model.User) error {
	if err := c.Bind(r); err != nil {
		return err
	}
	if err := c.Validate(r); err != nil {
		return err
	}
	u.Username = r.User.Username
	u.Email = r.User.Email
	u.Password = r.User.Password

	return nil
}

type userRegisterRequest struct {
	User struct {
		Username string `json:"username" validate:"required"`
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
	} `json:"user"`
}

type getAllTripsRequest struct {
	UserID uint `json:"user_id"`
}

func (r *getAllTripsRequest) bind(c echo.Context) error {
	if err := c.Bind(r); err != nil {
		return err
	}
	if r.UserID == 0 {
		return errors.New("user_id parameter is required")
	}
	return nil
}

type newTripRequest struct {
	Trip struct {
		Departure string `json:"departure" validate:"required"`
		Arrival   string `json:"arrival" validate:"required"`
		UserID    uint   `json:"user_id" validate:"required"`
	} `json:"trip"`
	Places []struct {
		Name          string `json:"name" validate:"required"`
		Latitude      string `json:"latitude" validate:"required"`
		Longitude     string `json:"longitude" validate:"required"`
		Google_API_ID string `json:"Google_API_ID" validate:"required"`
	} `json:"places"`
}

type newPlaceRequest struct {
	Place struct {
		Name          string `json:"name" validate:"required"`
		Latitude      string `json:"latitude" validate:"required"`
		Longitude     string `json:"longitude" validate:"required"`
		Google_API_ID string `json:"Google_API_ID" validate:"required"`
	} `json:"place"`
}

func (r *newTripRequest) bind(c echo.Context, t *model.Trip) error {
	if err := c.Bind(r); err != nil {
		return err
	}
	if err := c.Validate(r); err != nil {
		return err
	}

	t.Departure = r.Trip.Departure
	t.Arrival = r.Trip.Arrival
	t.UserID = r.Trip.UserID

	return nil
}

func (r *newPlaceRequest) bind(c echo.Context, p *model.Place) error {
	if err := c.Bind(r); err != nil {
		return err
	}
	if err := c.Validate(r); err != nil {
		return err
	}

	p.Name = r.Place.Name
	p.Longitude = r.Place.Longitude
	p.Latitude = r.Place.Latitude
	p.Google_API_ID = r.Place.Google_API_ID

	return nil
}

func (r *userRegisterRequest) bind(c echo.Context, u *model.User) error {
	if err := c.Bind(r); err != nil {
		return err
	}
	if err := c.Validate(r); err != nil {
		return err
	}

	u.Username = r.User.Username
	u.Email = r.User.Email
	u.Password = r.User.Password

	hashedPassword, err := u.HashPassword(r.User.Password)
	if err != nil {
		return err
	}
	u.Password = hashedPassword

	return nil
}

type userLoginRequest struct {
	User struct {
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
	} `json:"user"`
}

func (r *userLoginRequest) bind(c echo.Context) error {
	if err := c.Bind(r); err != nil {
		return err
	}
	if err := c.Validate(r); err != nil {
		return err
	}
	return nil
}
