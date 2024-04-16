package place

import "github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"

type Store interface {
	Create(*model.Place) error
	GetByName(name string) (*model.Place, error)
}
