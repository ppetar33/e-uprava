package model

type StatisticData struct {
	TotalProblems string `json:"totalProblems" bson:"totalProblems"`
	Anonymous     string `json:"anonymous" bson:"anonymous"`
	Public        string `json:"public" bson:"public"`
	Solved        string `json:"solved" bson:"solved"`
	Unsolved      string `json:"unsolved" bson:"unsolved"`
}
