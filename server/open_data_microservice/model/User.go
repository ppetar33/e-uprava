package model

type User struct {
	Id          string `json:"id" bson:"id"`
	Name        string `json:"name" bson:"name"`
	LastName    string `json:"lastName" bson:"lastName"`
	Jmbg        string `json:"jmbg" bson:"jmbg"`
	Password    string `json:"password" bson:"password"`
	Email       string `json:"email" bson:"email"`
	Role        string `json:"role" bson:"role"`
	PhoneNumber string `json:"phone-number" bson:"phone-number"`
	Address     string `json:"address" bson:"address"`
}
