package db

import (
	"fmt"

	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"
	"github.com/jinzhu/gorm"
)

func New() *gorm.DB {
	db, err := gorm.Open("sqlite3", "./golang-web.db")
	if err != nil {
		fmt.Println("storage err: ", err)
	}
	db.LogMode(true)
	return db
}

func AutoMigrate(db *gorm.DB) {
	db.AutoMigrate(
		&model.User{},
	)
}
