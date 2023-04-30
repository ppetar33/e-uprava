package model

type CommunalProblem struct {
	Id           string `json:"id" bson:"id"`
	Title        string `json:"title" bson:"title"`
	Description  string `json:"description" bson:"description"`
	Address      string `json:"address" bson:"address"`
	ReportedById string `json:"reportedById" bson:"reportedById"`
	ReportId     string `json:"reportId" bson:"reportId"`
	PolicemanId  string `json:"policemanId" bson:"policemanId"`
	JudgeId      string `json:"judgeId" bson:"judgeId"`
	Anonymous    bool   `json:"anonymous" bson:"anonymous"`
	Date         string `json:"date" bson:"date"`
	Municipality string `json:"municipality" bson:"municipality"`
}
