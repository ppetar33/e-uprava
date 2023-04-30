package model

type Report struct {
	Id   string `json:"id" bson:"id"`
	Text string `json:"text" bson:"text"`
	Date string `json:"date" bson:"date"`
}
