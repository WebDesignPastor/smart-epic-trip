package model

import (
	"gorm.io/gorm"
)

type Trip struct {
	gorm.Model
	Departure string
	Arrival   string
	UserID    uint
	User      User    `gorm:"foreignKey:UserID"`
	Places    []Place `gorm:"many2many:trip_places"`
}
