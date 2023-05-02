package main

import (
	"encoding/json"
	"github.com/ppetar33/e-uprava/auth_microservice/model"
	"io"
)

func DecodeBodyAuth(r io.Reader) (*model.Auth, error) {
	dec := json.NewDecoder(r)
	dec.DisallowUnknownFields()

	var rt model.Auth
	if err := dec.Decode(&rt); err != nil {
		return nil, err
	}
	return &rt, nil
}
