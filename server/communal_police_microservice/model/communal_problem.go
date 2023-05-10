package model

type CommunalProblem struct {
	Id           string `json:"id" bson:"id"`
	Title        string `json:"title" bson:"title"`
	Description  string `json:"description" bson:"description"`
	Address      string `json:"address" bson:"address"`
	ImageUrl     string `json:"imageUrl" bson:"imageUrl"`
	ReportedById string `json:"reportedById" bson:"reportedById"`
	Report       string `json:"report" bson:"report"`
	PolicemanId  string `json:"policemanId" bson:"policemanId"`
	JudgeId      string `json:"judgeId" bson:"judgeId"`
	Anonymous    bool   `json:"anonymous" bson:"anonymous"`
	Date         string `json:"date" bson:"date"`
	Municipality string `json:"municipality" bson:"municipality"`
	Accepted     *bool  `json:"accepted" bson:"accepted"`
	Sent         bool   `json:"sent" bson:"sent"`
	Solved       bool   `json:"solved" bson:"solved"`
	Improvement  string `json:"improvement" bson:"improvement"`
}
