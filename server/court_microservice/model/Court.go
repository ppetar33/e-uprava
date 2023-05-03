package model

type CourtType string

const (
	Apelacioni CourtType = "apelacioni"
	Osnovni    CourtType = "osnovni"
	Visi       CourtType = "visi"
	Vrhovni    CourtType = "vrhovni"
)

type Court struct {
	Id        string    `json:"id" bson:"id"`
	Name      string    `json:"name" bson:"name"`
	Address   string    `json:"address" bson:"address"`
	CourtType CourtType `json:"courtType" bson:"courtType"`
}
