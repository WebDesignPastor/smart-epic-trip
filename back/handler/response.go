package handler

import (
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"
)

type userResponse struct {
	User struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	} `json:"user"`
	Token string `json:"token"`
}

type tripResponse struct {
	Trip struct {
		Departure string `json:"departure"`
		Arrival   string `json:"arrival"`
		UserID    uint   `json:"user_id"`
	} `json:"trip"`
}

type placeResponse struct {
	Place struct {
		Name      string `json:"name"`
		Longitude string `json:"longitude"`
		Latitude  string `json:"latitude"`
	} `json:"place"`
}

func newUserResponse(u *model.User, token string) *userResponse {
	r := new(userResponse)
	r.User.Username = u.Username
	r.User.Email = u.Email
	r.User.Password = u.Password
	r.Token = token
	return r
}

func updateUserResponse(u *model.User) *userResponse {
	r := new(userResponse)
	r.User.Username = u.Username
	r.User.Email = u.Email
	r.User.Password = u.Password
	return r
}

func newTripResponse(t *model.Trip) *tripResponse {
	r := new(tripResponse)
	r.Trip.Departure = t.Departure
	r.Trip.Arrival = t.Arrival
	r.Trip.UserID = t.UserID
	return r
}

func newPlaceResponse(p *model.Place) *placeResponse {
	r := new(placeResponse)
	r.Place.Name = p.Name
	r.Place.Longitude = p.Longitude
	r.Place.Latitude = p.Latitude
	return r
}
