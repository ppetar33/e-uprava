package main

import (
	database "communal_police_microservice/server"
	"encoding/json"
	"github.com/gorilla/mux"
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

func (h Handler) GetResolvedCommunalProblems(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	communalProblems, err := h.Repo.GetResolvedCommunalProblems()

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

func (h Handler) GetListOfMunicipality(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	municipality, err := h.Repo.GetListOfMunicipality()

	if err != nil {
		json.NewEncoder(response).Encode(err)
		return
	} else {
		if municipality == nil {
			json.NewEncoder(response).Encode(`[]`)
		} else {
			json.NewEncoder(response).Encode(municipality)
		}
	}
}

func (h Handler) GetCommunalProblemByMunicipality(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(request)
	municipality, ok := vars["municipality"]
	if !ok {
		json.NewEncoder(response).Encode(`Municipality is missing in parameters`)
	}

	communalProblems, err := h.Repo.GetCommunalProblemByMunicipality(municipality)

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

func (h Handler) GetPolicemanCommunalProblems(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(request)
	policemanId, ok := vars["id"]
	if !ok {
		json.NewEncoder(response).Encode(`Policeman ID is missing in parameters`)
		return
	}

	communalProblems, err := h.Repo.GetCommunalProblemsByPoliceman(policemanId)

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

func (h Handler) GetStatisticData(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	municipality, err := h.Repo.GetStatisticData()

	if err != nil {
		json.NewEncoder(response).Encode(err)
		return
	} else {
		json.NewEncoder(response).Encode(municipality)
	}
}

func (h Handler) GetCitizenCommunalProblems(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(request)
	citizenId, ok := vars["id"]
	if !ok {
		json.NewEncoder(response).Encode(`Policeman ID is missing in parameters`)
		return
	}

	communalProblems, err := h.Repo.GetCommunalProblemsByCitizen(citizenId)

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

func (h Handler) AddReport(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	communalProblem, errDecodeBody := DecodeBodyCommunalProblem(request.Body)

	if errDecodeBody != nil {
		http.Error(response, errDecodeBody.Error(), http.StatusBadRequest)
		log.Println(request.RemoteAddr + " " + request.Method + " " + request.RequestURI + " " + strconv.Itoa(http.StatusBadRequest))
		return
	}

	err := h.Repo.AddReport(communalProblem.Id, communalProblem.ReportId)

	if err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(response).Encode(`Successfully added report!`)
}

func (h Handler) DeleteCommunalProblemById(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(request)
	id, ok := vars["id"]
	if !ok {
		json.NewEncoder(response).Encode(`Policeman ID is missing in parameters`)
		return
	}

	err := h.Repo.DeleteCommunalProblemById(id)

	if err != nil {
		json.NewEncoder(response).Encode(err)
		return
	}
}
