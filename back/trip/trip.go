package trip

import "github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"

type Store interface {
	GetAllByUser(uint) ([]model.Trip, error)
	GetByID(uint) (*model.Trip, error)
	Create(*model.Trip) error
	Update(*model.Trip) error
	Delete(*model.Trip) error
	LinkPlaceToTrip(tripID, placeID uint) error
}
