package main

import (
	database "communal_police_microservice/server"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

type Handler struct {
	Repo database.Repository
}

func CommunalPoliceTest(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(response).Encode("Test Endpoint for communal police")

	if err != nil {
		return
	}
}

func (h Handler) CreateCommunalProblem(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	communalProblem, errDecodeBody := DecodeBodyCommunalProblem(request.Body)

	if errDecodeBody != nil {
		http.Error(response, errDecodeBody.Error(), http.StatusBadRequest)
		log.Println(request.RemoteAddr + " " + request.Method + " " + request.RequestURI + " " + strconv.Itoa(http.StatusBadRequest))
		return
	}

	result, err := h.Repo.SaveCommunalProblem(communalProblem)

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

func (h Handler) GetAllCommunalProblems(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	communalProblems, err := h.Repo.GetAllCommunalProblems()

	if err != nil {
		json.NewEncoder(response).Encode(err)
		return
	} else {
		if communalProblems == nil {
			json.NewEncoder(response).Encode(`[]`)
		} else {
			json.NewEncoder(response).Encode(communalProblems)
		}
	}
}
