package model

import (
	"gorm.io/gorm"
)

type Place struct {
	gorm.Model
	Name        string `gorm:"not null"`
	Latitude    string `gorm:"uniqueIndex;not null"`
	Longitude   string `gorm:"uniqueIndex;not null"`
	GoogleApiId string `gorm:"uniqueIndex;not null"`
	Trips       []Trip `gorm:"many2many:trip_places"`
}
