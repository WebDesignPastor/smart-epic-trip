package handler

import (
	"log"
	"os"
	"testing"

	"encoding/json"

	"github.com/labstack/echo/v4"

	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/db"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/model"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/place"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/router"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/store"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/trip"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/user"
	_ "github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

var (
	d  *gorm.DB
	us user.Store
	ts trip.Store
	ps place.Store
	h  *Handler
	e  *echo.Echo
)

func TestMain(m *testing.M) {
	setup()
	code := m.Run()
	tearDown()
	os.Exit(code)
}

func authHeader(token string) string {
	return "Token " + token
}

func setup() {
	d = db.TestDB()
	db.AutoMigrate(d)
	us = store.NewUserStore(d)
	ts = store.NewTripStore(d)
	ps = store.NewPlaceStore(d)
	h = NewHandler(us, ts, ps)
	e = router.New()
	loadFixtures()
}

func tearDown() {
	dbInstance, _ := d.DB()
	_ = dbInstance.Close()
	if err := db.DropTestDB(); err != nil {
		log.Fatal(err)
	}
}

func responseMap(b []byte, key string) map[string]interface{} {
	var m map[string]interface{}
	json.Unmarshal(b, &m)
	return m[key].(map[string]interface{})
}

func loadFixtures() error {
	u1 := model.User{
		Username: "user422",
		Email:    "user32222@test.com",
	}
	u1.Password, _ = u1.HashPassword("secret")
	if err := us.Create(&u1); err != nil {
		return err
	}

	u2 := model.User{
		Username: "user4222",
		Email:    "user4222@test.com",
	}
	u2.Password, _ = u2.HashPassword("secret")
	if err := us.Create(&u2); err != nil {
		return err
	}
	return nil
}
