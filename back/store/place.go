package store

import (
	"errors"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"
	"gorm.io/gorm"
)

type PlaceStore struct {
	db *gorm.DB
}

func NewPlaceStore(db *gorm.DB) *PlaceStore {
	return &PlaceStore{
		db: db,
	}
}

func (ps *PlaceStore) Create(place *model.Place) error {
	return ps.db.Create(place).Error
}

func (ps *PlaceStore) GetByName(name string) (*model.Place, error) {
	var place model.Place
	if err := ps.db.Where("name = ?", name).First(&place).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &place, nil
}
