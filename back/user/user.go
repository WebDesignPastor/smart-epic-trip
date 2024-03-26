package user

import "github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"

type Store interface {
	GetByID(uint) (*model.User, error)
	GetByEmail(string) (*model.User, error)
	Create(*model.User) error
	Update(*model.User) error
	Delete(*model.User) error
	GetAll() ([]model.User, error)
}
