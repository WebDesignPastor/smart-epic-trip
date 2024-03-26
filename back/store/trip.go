package store

import (
	"errors"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"
	"gorm.io/gorm"
)

type TripStore struct {
	db *gorm.DB
}

func NewTripStore(db *gorm.DB) *TripStore {
	return &TripStore{
		db: db,
	}
}

func (ts *TripStore) GetAll() ([]model.Trip, error) {
	var trips []model.Trip
	if err := ts.db.Find(&trips).Error; err != nil {
		return nil, err
	}
	return trips, nil
}

func (ts *TripStore) GetByID(id uint) (*model.Trip, error) {
	var trip model.Trip
	if err := ts.db.First(&trip, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &trip, nil
}

func (ts *TripStore) Create(trip *model.Trip) error {
	return ts.db.Create(trip).Error
}

func (ts *TripStore) Update(trip *model.Trip) error {
	return ts.db.Save(trip).Error
}

func (ts *TripStore) Delete(trip *model.Trip) error {
	return ts.db.Delete(trip).Error
}
