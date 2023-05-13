package model

type Hearing struct {
	Email string `json:"email" bson:"email"`
	Date  string `json:"date" bson:"date"`
}
