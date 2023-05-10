package main

import (
	database "communal_police_microservice/server"
	"context"
	"fmt"
	gorillaHandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
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

	server, err := database.ConnectToCommunalPoliceDatabase()
	database.Ping()
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(server.NumberSessionsInProgress())

	repo := database.Repository{}
	handler := Handler{
		Repo: repo,
	}

	router.HandleFunc("/api/communal-police/test", CommunalPoliceTest).Methods("GET")
	router.HandleFunc("/api/communal-police/create-communal-problem", handler.CreateCommunalProblem).Methods("POST")
	router.HandleFunc("/api/communal-police/get-communal-problems", handler.GetAllCommunalProblems).Methods("GET")

	router.HandleFunc("/api/communal-police/get-municipality", handler.GetListOfMunicipality).Methods("GET")
	router.HandleFunc("/api/communal-police/get-communal-problems/{municipality}", handler.GetCommunalProblemByMunicipality).Methods("GET")
	router.HandleFunc("/api/communal-police/get-statistic-data", handler.GetStatisticData).Methods("GET")

	router.HandleFunc("/api/communal-police/get-communal-problems/policeman/{id}", handler.GetPolicemanCommunalProblems).Methods("GET")
	router.HandleFunc("/api/communal-police/get-communal-problems/citizen/{id}", handler.GetCitizenCommunalProblems).Methods("GET")
	router.HandleFunc("/api/communal-police/improve-communal-problem", handler.ImproveProblem).Methods("PUT")
	router.HandleFunc("/api/communal-police/sent-to-court", handler.SentToCourt).Methods("PUT")
	router.HandleFunc("/api/communal-police/add-report", handler.AddReport).Methods("PUT")
	router.HandleFunc("/api/communal-police/solve", handler.AddReport).Methods("PUT")

	cors := gorillaHandlers.CORS(gorillaHandlers.AllowedOrigins([]string{"*"}))

	startServer(router, cors)
}

func startServer(router *mux.Router, cors func(http.Handler) http.Handler) {
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	srv := &http.Server{
		Addr:         "0.0.0.0:8083",
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
