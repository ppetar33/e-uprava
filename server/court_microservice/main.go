package main

import (
	"context"
	"fmt"
	gorillaHandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	database "github.com/ppetar33/e-uprava/court_microservice/server"
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

	router.HandleFunc("/api/court/communal-problem", WriteCommunalProblem).Methods("POST")
	router.Handle("/api/court/communal-problem", ValidateJWT(GetCommunalProblems)).Methods("GET")
	router.Handle("/api/court/communal-problem/delete/{id}", ValidateJWT(DeleteCommunalProblem)).Methods("DELETE")
	router.Handle("/api/court/communal-problem/id/{id}", ValidateJWT(GetCommunalProblemById)).Methods("GET")
	router.Handle("/api/court/communal-problem/accept/{id}", ValidateJWT(AcceptCommunalProblem)).Methods("PUT")
	router.Handle("/api/court/communal-problem/decline/{id}", ValidateJWT(DeclineCommunalProblem)).Methods("PUT")
	router.Handle("/api/court/communal-problem/solve/{id}", ValidateJWT(SolveCommunalProblem)).Methods("PUT")
	router.Handle("/api/court/communal-problem/judge/{id}", ValidateJWT(GetJudgeCommunalProblems)).Methods("GET")
	router.Handle("/api/court/judge", ValidateJWT(WriteJudge)).Methods("POST")
	router.Handle("/api/court/judge", ValidateJWT(GetJudges)).Methods("GET")

	cors := gorillaHandlers.CORS(gorillaHandlers.AllowedOrigins([]string{"*"}))

	startServer(router, cors)
}

func startServer(router *mux.Router, cors func(http.Handler) http.Handler) {
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	srv := &http.Server{
		Addr:         "0.0.0.0:8081",
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
