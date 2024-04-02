package handler

import "github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"

type userResponse struct {
	User struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	} `json:"user"`
}

type tripResponse struct {
	Trip struct {
		Departure string `json:"departure"`
		Arrival   string `json:"arrival"`
		UserID    uint   `json:"userID"`
		User      struct {
			Username string `json:"username"`
			Email    string `json:"email"`
		} `json:"user"`
	} `json:"trip"`
}

func newUserResponse(u *model.User) *userResponse {
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
	r.Trip.UserID = t.User.ID
	r.Trip.User.Username = t.User.Username
	r.Trip.User.Email = t.User.Email
	return r
}
