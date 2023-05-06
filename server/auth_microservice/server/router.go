package server

import (
	"encoding/gob"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func NewRouter(auth *Authenticator) *gin.Engine {
	router := gin.Default()

	// To store custom types in our cookies,
	// we must first register them using gob.Register
	gob.Register(map[string]interface{}{})

	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("auth-session", store))

	router.GET("/api/auth/login", HandlerLogin(auth))
	router.GET("/api/auth/callback", HandlerCallback(auth))
	router.GET("/api/auth/user", HandlerUser)
	router.GET("/api/auth/logout", HandlerLogout)

	return router
}
