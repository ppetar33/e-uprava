package main

import (
	"encoding/json"
	"net/http"
)

func OpenDataTest(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	json.NewEncoder(response).Encode("Test Endpoint for open data")
}
