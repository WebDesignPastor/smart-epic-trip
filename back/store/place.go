package store

import (
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

//func (ts *TripStore) GetAll() ([]model.Trip, error) {
//	var trips []model.Trip
//	if err := ts.db.Find(&trips).Error; err != nil {
//		return nil, err
//	}
//	return trips, nil
//}
//
//func (ts *TripStore) GetByID(id uint) (*model.Trip, error) {
//	var trip model.Trip
//	if err := ts.db.First(&trip, id).Error; err != nil {
//		if errors.Is(err, gorm.ErrRecordNotFound) {
//			return nil, nil
//		}
//		return nil, err
//	}
//	return &trip, nil
//}

func (ps *PlaceStore) Create(place *model.Place) error {
	return ps.db.Create(place).Error
}

//func (ps *PlaceStore) Update(place *model.Place) error {
//	return ps.db.Save(place).Error
//}

//func (ps *PlaceStore) Delete(place *model.Place) error {
//	return ps.db.Delete(place).Error
//}
