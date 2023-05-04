package main

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	gorillaHandlers "github.com/gorilla/handlers"
	database "github.com/ppetar33/e-uprava/auth_microservice/server"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	log.Println("Starting the application")

	auth, err := database.New()
	if err != nil {
		log.Fatalf("Failed to initialize the authenticator: %v", err)
	}

	rtr := database.NewRouter(auth)

	server, err := database.ConnectToAuthDatabase()

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(server.NumberSessionsInProgress())

	//router.HandleFunc("/api/auth/login", Login).Methods("POST")
	//router.HandleFunc("/api/auth/register", Register).Methods("POST")

	cors := gorillaHandlers.CORS(gorillaHandlers.AllowedOrigins([]string{"*"}))

	startServer(rtr, cors)
}

func startServer(router *gin.Engine, cors func(http.Handler) http.Handler) {
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	srv := &http.Server{
		Addr:         "0.0.0.0:8080",
		Handler:      cors(router),
		IdleTimeout:  120 * time.Second,
		ReadTimeout:  120 * time.Second,
		WriteTimeout: 120 * time.Second,
	}

	go func() {
		log.Println("Server Starting")
		if err := srv.ListenAndServe(); err != nil {
			if err != http.ErrServerClosed {
				log.Fatal(err)
			}
		}
	}()

	shutDownServer(srv, quit)
}

func shutDownServer(srv *http.Server, quit chan os.Signal) {
	<-quit

	log.Println("Service Shutting Down ...")

	// gracefully stop server
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	defer database.Disconnect(ctx)

	// NoSQL: Checking if the connection was established
	database.Ping()

	if err := srv.Shutdown(ctx); err != nil {
		fmt.Println(err)
	}

	log.Println("Server Stopped")
}
