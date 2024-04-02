package middleware

import (
	//"fmt"
	//"net/http"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	//echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

type JwtCustomClaims struct {
	User_id int `json:"id"`
	jwt.RegisteredClaims
}

//func GetJwt(c echo.Context) error {
//	return
//}

func CreateJwt(id int) (string, error) {
	claims := &JwtCustomClaims{
		id,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 72)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte("secret"))
	return t, err
}

func ExtractId(c echo.Context) (int, error) {
	token, ok := c.Get("user").(*jwt.Token) // by default token is stored under user key
	if !ok {
		return -1, errors.New("JWT token missing or invalid")
	}

	claims, ok := token.Claims.(*JwtCustomClaims)
	if !ok {
		return -1, errors.New("failed to cast claims as JwtCustomClaims")
	}
	user_id := claims.User_id

	return user_id, nil
}

//
//func Process(c echo.Context) error {
//	claims := &JwtCustomClaims{
//		1,
//		jwt.RegisteredClaims{
//			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 72)),
//		},
//	}
//	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
//
//	t, err := token.SignedString([]byte("test"))
//	if err != nil {
//		return err
//	}
//	return c.JSON(http.StatusOK, echo.Map{
//		"token": t,
//	})
//}

//func Middleware1(next echo.HandlerFunc) echo.HandlerFunc {
//	return func(c echo.Context) error {
//		config := echojwt.Config{
//			SigningKey: []byte("secret"),
//		}
//		next.Use(echojwt.WithConfig(config))
//		fmt.Println(c.Request().Header.Get("Authorization"))
//		t, err := c.Get("user").(*jwt.Token)
//		if !err {
//			fmt.Println("no jwt")
//			return next(c)
//		}
//		fmt.Println("jwt found")
//		fmt.Println(t)
//		return next(c)
//	}
//}
