package model

import (
	"gorm.io/gorm"
)

type Trip struct {
	gorm.Model
	Departure string `gorm:"uniqueIndex"`
	Arrival   string `gorm:"uniqueIndex"`
	UserID    uint
	User      User `gorm:"foreignKey:UserID"`
}
