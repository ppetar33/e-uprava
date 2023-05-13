package main

import (
	"encoding/json"
	"github.com/ppetar33/e-uprava/court_microservice/model"
	"io"
)

func DecodyBodyCommunalProblem(r io.Reader) (*model.CommunalProblem, error) {
	dec := json.NewDecoder(r)
	dec.DisallowUnknownFields()

	var rt model.CommunalProblem
	if err := dec.Decode(&rt); err != nil {
		return nil, err
	}

	return &rt, nil
}

func DecodyBodyImprovement(r io.Reader) (*model.Improvement, error) {
	dec := json.NewDecoder(r)
	dec.DisallowUnknownFields()

	var rt model.Improvement
	if err := dec.Decode(&rt); err != nil {
		return nil, err
	}

	return &rt, nil
}

func DecodyBodyHearing(r io.Reader) (*model.Hearing, error) {
	dec := json.NewDecoder(r)
	dec.DisallowUnknownFields()

	var rt model.Hearing
	if err := dec.Decode(&rt); err != nil {
		return nil, err
	}

	return &rt, nil
}

func DecodyBodyJudge(r io.Reader) (*model.Judge, error) {
	dec := json.NewDecoder(r)
	dec.DisallowUnknownFields()

	var rt model.Judge
	if err := dec.Decode(&rt); err != nil {
		return nil, err
	}

	return &rt, nil
}
