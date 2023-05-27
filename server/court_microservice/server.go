package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/ppetar33/e-uprava/court_microservice/model"
	"github.com/ppetar33/e-uprava/court_microservice/server"
	"log"
	"mime"
	"net/http"
	"net/smtp"
	"strconv"
)

func WriteCommunalProblem(response http.ResponseWriter, r *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	contentType := r.Header.Get("Content-Type")
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

	communalProblem, errDecodeBody := DecodyBodyCommunalProblem(r.Body)

	if errDecodeBody != nil {
		http.Error(response, errDecodeBody.Error(), http.StatusBadRequest)
		return
	}

	if communalProblem != nil {
		fmt.Println(communalProblem)
		_, err := server.WriteIntoCommunalProblems(communalProblem)

		if err != nil {
			json.NewEncoder(response).Encode(err)
			return
		} else {
			json.NewEncoder(response).Encode(`Successfully added new communal problem!`)
		}
	}
}

func GetCommunalProblems(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	communalProblems, err := server.GetAllCommunalProblems()

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

func AcceptCommunalProblem(response http.ResponseWriter, r *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	contentType := r.Header.Get("Content-Type")
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

	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		json.NewEncoder(response).Encode(`*** ID is missing in parameters ***`)
		log.Println(r.RemoteAddr + " " + r.Method + " " + r.RequestURI + " " + strconv.Itoa(http.StatusBadRequest))
		return
	}

	hearing, errDecodeBody := DecodyBodyHearing(r.Body)

	if errDecodeBody != nil {
		http.Error(response, errDecodeBody.Error(), http.StatusBadRequest)
		return
	}

	if hearing.Email != "" {
		from := "tim.osam.twitter.clone@gmail.com"
		sifra := "bxafykgbwdgfzqre"

		to := []string{
			hearing.Email,
		}

		smtpHost := "smtp.gmail.com"
		smtpPort := "587"

		msg := []byte("Subject: Summons to a hearing!\r\n" +
			"\r\n" +
			"You have been asked for summons to a hearing on date\r\n " + hearing.Date)

		au := smtp.PlainAuth("", from, sifra, smtpHost)
		errEmail := smtp.SendMail(smtpHost+":"+smtpPort, au, from, to, msg)
		if errEmail != nil {
			fmt.Println("ERROR")
			fmt.Println(errEmail)
		}
		fmt.Println("Email Sent Successfully!")

		err := server.AcceptCommunalProblem(id, hearing.Date)
		if err != nil {
			http.Error(response, err.Error(), http.StatusBadRequest)
			return
		} else {
			json.NewEncoder(response).Encode(`*** Successfully accepted ***`)
		}
	}
}

func SolveCommunalProblem(response http.ResponseWriter, r *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		json.NewEncoder(response).Encode(`*** ID is missing in parameters ***`)
		log.Println(r.RemoteAddr + " " + r.Method + " " + r.RequestURI + " " + strconv.Itoa(http.StatusBadRequest))
		return
	}

	err := server.SolveCommunalProblem(id)
	if err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	} else {
		json.NewEncoder(response).Encode(`*** Successfully solved communal problem ***`)
	}
}

func DeclineCommunalProblem(response http.ResponseWriter, r *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	contentType := r.Header.Get("Content-Type")
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

	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		json.NewEncoder(response).Encode(`*** ID is missing in parameters ***`)
		log.Println(r.RemoteAddr + " " + r.Method + " " + r.RequestURI + " " + strconv.Itoa(http.StatusBadRequest))
		return
	}

	improvement, errDecodeBody := DecodyBodyImprovement(r.Body)

	if errDecodeBody != nil {
		http.Error(response, errDecodeBody.Error(), http.StatusBadRequest)
		return
	}

	if improvement != nil {
		err := server.DeclineCommunalProblem(id, improvement)
		if err != nil {
			http.Error(response, err.Error(), http.StatusBadRequest)
			return
		} else {
			json.NewEncoder(response).Encode(`*** Successfully declined ***`)
		}
	}
}

func DeleteCommunalProblem(response http.ResponseWriter, r *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	contentType := r.Header.Get("Content-Type")
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

	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		json.NewEncoder(response).Encode(`*** ID is missing in parameters ***`)
		log.Println(r.RemoteAddr + " " + r.Method + " " + r.RequestURI + " " + strconv.Itoa(http.StatusBadRequest))
		return
	}

	err := server.DeleteCommunalProblem(id)
	if err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	} else {
		json.NewEncoder(response).Encode(`*** Successfully deleted ***`)
	}
}

func GetJudgeCommunalProblems(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(request)
	judgeId, ok := vars["id"]
	if !ok {
		json.NewEncoder(response).Encode(`Judge ID is missing in parameters`)
		return
	}

	communalProblems, err := server.GetCommunalProblemsByJudge(judgeId)

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

func GetCommunalProblemById(response http.ResponseWriter, r *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		json.NewEncoder(response).Encode(`ID is missing in parameters`)
		return
	}

	communalProblem := server.GetCommunalProblemById(id)
	if communalProblem == (model.CommunalProblem{}) {
		json.NewEncoder(response).Encode(`Doesn't exist communal problem with this id`)
		return
	} else {
		json.NewEncoder(response).Encode(communalProblem)
	}
}

func WriteJudge(response http.ResponseWriter, r *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	contentType := r.Header.Get("Content-Type")
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

	judge, errDecodeBody := DecodyBodyJudge(r.Body)

	if errDecodeBody != nil {
		http.Error(response, errDecodeBody.Error(), http.StatusBadRequest)
		return
	}

	if judge != nil {
		fmt.Println(judge)
		_, err := server.WriteIntoJudges(judge)

		if err != nil {
			json.NewEncoder(response).Encode(err)
			return
		} else {
			json.NewEncoder(response).Encode(`Successfully added new judge!`)
		}
	}
}

func GetJudges(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	communalProblems, err := server.GetAllJudges()

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
