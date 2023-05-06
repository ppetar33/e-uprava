package main

import (
	"context"
	"fmt"
	gorillaHandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
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

	router := mux.NewRouter()
	router.StrictSlash(true)

	server, err := database.ConnectToAuthDatabase()

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(server.NumberSessionsInProgress())

	router.HandleFunc("/api/auth/login", Login).Methods("POST")
	router.HandleFunc("/api/auth/register", Register).Methods("POST")
	router.HandleFunc("/api/auth/get-judges", GetJudges).Methods("GET")
	router.HandleFunc("/api/auth/get-municipality", GetListOfMunicipality).Methods("GET")
	router.HandleFunc("/api/auth/get-judges/{municipality}", GetJudgeByMunicipality).Methods("GET")
	router.HandleFunc("/api/auth/logout", Logout).Methods("POST")
	router.HandleFunc("/api/auth/authenticated", Authenticated).Methods("GET")
	router.HandleFunc("/api/auth/user/{id}", GetUserById).Methods("GET")
	router.HandleFunc("/api/auth/users", GetUsers).Methods("GET")
	router.HandleFunc("/api/auth/judges", GetAllJudges).Methods("GET")

	cors := gorillaHandlers.CORS(gorillaHandlers.AllowedOrigins([]string{"*"}))

	startServer(router, cors)
}

func startServer(router *mux.Router, cors func(http.Handler) http.Handler) {
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
