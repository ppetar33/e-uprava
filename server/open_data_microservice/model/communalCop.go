package model

type CommunalCop struct {
	Id        string `json:"id" bson:"id"`
	FirstName string `json:"firstname" bson:"firstname"`
	LastName  string `json:"lastname" bson:"lastname"`
	Password  string `json:"password" bson:"password"`
	Jmbg      string `json:"jmbg" bson:"jmbg"`
	Email     string `json:"email" bson:"email"`
	City      string `json:"city" bson:"city"`
	Role      string `json:"role" bson:"role"`
}
