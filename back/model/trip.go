package model

import (
	"gorm.io/gorm"
)

type Trip struct {
	gorm.Model
	Departure string `gorm:"uniqueIndex"`
	Arrival   string `gorm:"uniqueIndex"`
	user      User
}
