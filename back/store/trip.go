package store

import (
	"errors"
	"log"

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

func (ts *TripStore) GetAllByUser(userID uint) ([]model.Trip, error) {
	var trips []model.Trip

	if err := ts.db.Where("user_id = ?", userID).Find(&trips).Error; err != nil {
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

func (ts *TripStore) LinkPlaceToTrip(tripID, placeID uint) error {
	// Check if the trip with the given ID exists
	trip, err := ts.GetByID(tripID)
	if err != nil {
		return err
	}
	if trip == nil {
		return errors.New("trip not found")
	}

	// Check if the place with the given ID exists
	place, err := ts.getPlaceByID(placeID)
	if err != nil {
		return err
	}
	if place == nil {
		return errors.New("place not found")
	}

	// Add the place to the trip's list of places
	if err := ts.db.Model(&trip).Association("Places").Append(place); err != nil {
		log.Printf("Failed to link place %d to trip %d: %v\n", placeID, tripID, err)
		return err
	}

	log.Printf("Place %d linked to trip %d successfully\n", placeID, tripID)
	return nil
}

func (ts *TripStore) getPlaceByID(id uint) (*model.Place, error) {
	var place model.Place
	if err := ts.db.First(&place, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &place, nil
}
