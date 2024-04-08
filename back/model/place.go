package model

import (
	"gorm.io/gorm"
)

type Place struct {
	gorm.Model
	Name      string `gorm:"uniqueIndex;not null"`
	Latitude  string `gorm:"uniqueIndex;not null"`
	Longitude string `gorm:"uniqueIndex;not null"`
}
