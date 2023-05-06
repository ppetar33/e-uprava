package main

import (
	"encoding/json"
	"errors"
	"github.com/gorilla/mux"
	"github.com/ppetar33/e-uprava/auth_microservice/model"
	"github.com/ppetar33/e-uprava/auth_microservice/server"
	"mime"
	"net/http"
)

func Login(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	contentType := request.Header.Get("Content-Type")
	mediatype, _, errContentType := mime.ParseMediaType(contentType)

	if errContentType != nil {
		http.Error(response, errContentType.Error(), http.StatusBadRequest)
		return
	}

	if mediatype != "application/json" {
		err := errors.New("expect application/json Content-Type")
		http.Error(response, err.Error(), http.StatusUnsupportedMediaType)
		return
	}

	user, errDecodeBody := DecodeBodyAuth(request.Body)

	if errDecodeBody != nil {
		http.Error(response, errDecodeBody.Error(), http.StatusBadRequest)
		return
	}

	if user != nil {
		authResult, role, err := server.Login(user)

		if err != nil {
			http.Error(response, err.Error(), http.StatusBadRequest)
			return
		}

		var redirectURL string

		if role == "judge" {
			redirectURL = "http://localhost:4300"
		} else if role == "policeman" {
			redirectURL = "http://localhost:4400"
		} else {
			redirectURL = "http://localhost:4500"
		}

		loginResponse := &model.LoginResponse{
			Token:       authResult,
			RedirectURL: redirectURL,
		}

		json.NewEncoder(response).Encode(loginResponse)
	}
}

func ValidateRequest(response http.ResponseWriter, request *http.Request) bool {
	response.Header().Set("Content-Type", "application/json")
	contentType := request.Header.Get("Content-Type")
	mediatype, _, errContentType := mime.ParseMediaType(contentType)

	if errContentType != nil {
		http.Error(response, errContentType.Error(), http.StatusBadRequest)
		return true
	}

	if mediatype != "application/json" {
		err := errors.New("expect application/json Content-Type")
		http.Error(response, err.Error(), http.StatusUnsupportedMediaType)
		return true
	}
	return false
}

func Register(response http.ResponseWriter, request *http.Request) {

	if ValidateRequest(response, request) {
		return
	}

	user, errDecodeBody := DecodeBodyAuth(request.Body)

	if errDecodeBody != nil {
		http.Error(response, errDecodeBody.Error(), http.StatusBadRequest)
		return
	}

	if user != nil {
		authResult, err := server.RegisterUser(user)

		if authResult == nil {
			json.NewEncoder(response).Encode(err.Error())
			return
		}
		if err != nil {
			http.Error(response, err.Error(), http.StatusBadRequest)
			return
		}
		json.NewEncoder(response).Encode(authResult)
	}
}

func GetJudges(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	judges, err := server.GetJudges()

	if err != nil {
		json.NewEncoder(response).Encode(err)
		return
	} else {
		if judges == nil {
			json.NewEncoder(response).Encode(`[]`)
		} else {
			json.NewEncoder(response).Encode(judges)
		}
	}
}

func GetListOfMunicipality(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	municipality, err := server.GetListOfMunicipality()

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

func GetJudgeByMunicipality(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(request)
	municipality, ok := vars["municipality"]
	if !ok {
		json.NewEncoder(response).Encode(`Municipality is missing in parameters`)
	}

	judges, err := server.GetJudgeByMunicipality(municipality)

	if err != nil {
		json.NewEncoder(response).Encode(err)
		return
	} else {
		if judges == nil {
			json.NewEncoder(response).Encode(`[]`)
		} else {
			json.NewEncoder(response).Encode(judges)
		}
	}
}
