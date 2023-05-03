package main

import (
	"encoding/json"
	"net/http"
	"open_data_microservice/server"
)

func OpenDataTest(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	json.NewEncoder(response).Encode("Test Endpoint for open data")
}

func GetAllCops(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	result, err := server.GetAllCops()

	if result == nil {
		json.NewEncoder(response).Encode(err.Error())
		return
	}

	if err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(response).Encode(result)
}

func GetAllJudges(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	result, err := server.GetAllJudges()

	if result == nil {
		json.NewEncoder(response).Encode(err.Error())
		return
	}

	if err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(response).Encode(result)
}
