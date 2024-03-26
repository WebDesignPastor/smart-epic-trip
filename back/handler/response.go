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
		departure string `json:"departure"`
		arrival   string `json:"arrival"`
	} `json:"trip"`
}

func newUserResponse(u *model.User) *userResponse {
	r := new(userResponse)
	r.User.Username = u.Username
	r.User.Email = u.Email
	r.User.Password = u.Password
	return r
}
