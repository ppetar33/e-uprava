package model

type StatisticData struct {
	TotalProblems string `json:"totalProblems" bson:"totalProblems"`
	Anonymous     string `json:"anonymous" bson:"anonymous"`
	Public        string `json:"public" bson:"public"`
}
