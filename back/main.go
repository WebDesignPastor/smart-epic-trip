package main

import (
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/db"
	_ "github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/docs"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/handler"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/router"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/store"
	"github.com/swaggo/echo-swagger"
)

// @title Trips api
// @version 1.0
// @description Api to save trip itenary and it's corresponding places

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /api
func main() {

	e := router.New()

	e.GET("/swagger/*", echoSwagger.WrapHandler)

	d := db.New()
	db.AutoMigrate(d)

	g := e.Group("/api")

	//return address of created struct userstore / called with db as parameter
	us := store.NewUserStore(d)
	ts := store.NewTripStore(d)
	ps := store.NewPlaceStore(d)
	h := handler.NewHandler(us, ts, ps)
	h.Register(g)

	//e.Logger.Fatal(e.StartAutoTLS(":8080"))
	e.Logger.Fatal(e.Start(":8080"))
}
