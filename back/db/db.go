package db

import (
	"fmt"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"os"
)

func New() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("golang-web.db?_pragma=foreign_keys(1)"), &gorm.Config{})
	if err != nil {
		fmt.Println("storage err: ", err)
	}
	return db
}

func TestDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("golang-web-test.db"), &gorm.Config{})
	if err != nil {
		fmt.Println("storage err: ", err)
	}
	return db
}

func DropTestDB() error {
	if err := os.Remove("./golang-web-test.db"); err != nil {
		return err
	}
	return nil
}

func AutoMigrate(db *gorm.DB) {
	db.AutoMigrate(
		&model.User{},
		&model.Trip{},
		&model.Place{},
	)
}
