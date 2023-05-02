package main

import (
	"encoding/json"
	"net/http"
	database "open_data_microservice/server"
)

type Handler struct {
	Repo database.Repository
}

func OpenDataTest(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	json.NewEncoder(response).Encode("Test Endpoint for open data")
}

func (h Handler) GetAllCommunalCops(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	result, err := h.Repo.GetAllCommunalCops()

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
