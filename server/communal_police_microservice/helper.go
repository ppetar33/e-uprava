package main

import (
	"communal_police_microservice/model"
	"encoding/json"
	"io"
)

func DecodeBodyCommunalProblem(r io.Reader) (*model.CommunalProblem, error) {
	dec := json.NewDecoder(r)
	dec.DisallowUnknownFields()

	var rt model.CommunalProblem
	if err := dec.Decode(&rt); err != nil {
		return nil, err
	}

	return &rt, nil
}
