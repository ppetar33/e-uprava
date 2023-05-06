package model

type Judge struct {
	Id        string `json:"id" bson:"id"`
	FirstName string `json:"firstName" bson:"firstName"`
	LastName  string `json:"lastName" bson:"lastName"`
	Password  string `json:"password" bson:"password"`
	Username  string `json:"username" bson:"username"`
	Jmbg      string `json:"jmbg" bson:"jmbg"`
	Email     string `json:"email" bson:"email"`
	Role      string `json:"role" bson:"role"`
	Court     string `json:"court" bson:"court"`
}
