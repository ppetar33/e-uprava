package main

import (
	"encoding/json"
	"errors"
	"fmt"
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

func Authenticated(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	authenticated, err := server.Authenticated()

	fmt.Println(authenticated)

	if err != nil {
		json.NewEncoder(response).Encode(err)
		return
	} else {
		if authenticated == (model.Token{}) {
			json.NewEncoder(response).Encode(`Not authenticated`)
		} else {
			json.NewEncoder(response).Encode(authenticated)
		}
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

func Logout(response http.ResponseWriter, request *http.Request) {

	_, err := server.Logout()
	println("Odjavljivanje")
	if err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}
}
