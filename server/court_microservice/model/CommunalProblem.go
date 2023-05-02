package model

type CommunalProblem struct {
	Id          string `json:"id" bson:"id"`
	Title       string `json:"title" bson:"title"`
	Description string `json:"description" bson:"description"`
	Anonymous   bool   `json:"anonymous" bson:"anonymous"`
	Address     string `json:"address" bson:"address"`
	Judgeid     string `json:"judgeid" bson:"judgeid"`
	Accepted    *bool  `json:"accepted" bson:"accepted"`
}
