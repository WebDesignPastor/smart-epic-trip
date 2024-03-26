package main

import (
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/db"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/handler"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/router"
	"github.com/EpitechMscProPromo2025/T-WEB-800-REN_8/store"
)

func main() {

	e := router.New()

	d := db.New()
	db.AutoMigrate(d)

	g := e.Group("/api")

	//return address of created struct userstore / called with db as parameter
	us := store.NewUserStore(d)
	ts := store.NewTripStore(d)
	h := handler.NewHandler(us, ts)
	h.Register(g)

	e.Logger.Fatal(e.Start(":8080"))
}
