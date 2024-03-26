package model

import (
	"gorm.io/gorm"
)

type Trip struct {
	gorm.Model
	departure string `gorm:"uniqueIndex;not null"`
	arrival   string `gorm:"uniqueIndex;not null"`
	user      User
}
