package model

import (
	"gorm.io/gorm"
)

type Trip struct {
	gorm.Model
	Departure string
	Arrival   string
	UserID    uint
	User      User `gorm:"foreignKey:UserID"`
}
