package model

import (
	"gorm.io/gorm"
	"time"
)

type Trip struct {
	gorm.Model
	Departure     string
	Arrival       string
	DepartureDate time.Time `gorm:"type:datetime"`
	ArrivalDate   time.Time `gorm:"type:datetime"`
	UserId        uint
	User          User    `gorm:"foreignKey:UserId"`
	Places        []Place `gorm:"many2many:trip_places"`
}
