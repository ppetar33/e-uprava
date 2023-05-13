package server

import (
	"communal_police_microservice/model"
	"context"
	"errors"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"strconv"
	"time"
)

var client *mongo.Client

type Repository struct {
}

func ConnectToCommunalPoliceDatabase() (*mongo.Client, error) {
	ctx, err := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://communal-police-db:27017"))

	defer err()

	if err == nil {
		fmt.Println("Error with database")
	}

	return client, nil
}

func Ping() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Check connection -> if no error, connection is established
	err := client.Ping(ctx, readpref.Primary())
	if err != nil {
		fmt.Println(err)
	}

	// Print available databases
	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(databases)
}

func Disconnect(ctx context.Context) error {
	err := client.Disconnect(ctx)
	if err != nil {
		return err
	}
	return nil
}

func (r Repository) SaveCommunalProblem(communalProblem *model.CommunalProblem) (*mongo.InsertOneResult, error) {

	communalProblem.Id = uuid.New().String()
	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	foundedToken, _ := r.CheckToken(ctx)

	parsedToken, err := jwt.Parse(foundedToken, func(token *jwt.Token) (interface{}, error) {
		return []byte("gosecretkey"), nil
	})

	claims, ok := parsedToken.Claims.(jwt.MapClaims)

	if !ok {
		return nil, errors.New("Invalid token")
	}

	userRole := ""

	for key, val := range claims {
		if key == "role" {
			userRole += val.(string)
		}
	}

	if userRole == "" {
		return nil, errors.New("Unauthorized")
	}

	result, err := collection.InsertOne(ctx, communalProblem)

	if err != nil {
		fmt.Println(err)
		return nil, errors.New("error saving communal problem")
	} else {
		fmt.Println("****** Result inserted into AUTH database   ******  : ", communalProblem)
	}

	return result, nil
}

func (r Repository) GetAllCommunalProblems() ([]model.CommunalProblem, error) {

	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	result, err := collection.Find(ctx, bson.D{})

	var communalProblems []model.CommunalProblem

	if err != nil {
		fmt.Println(err)
		return nil, errors.New("error saving communal problem")
	} else {
		fmt.Println("****** All communal problems found   ******")
	}

	if err = result.All(ctx, &communalProblems); err != nil {
		fmt.Println(err)
	}

	return communalProblems, nil
}

func (r Repository) GetCommunalProblemByMunicipality(municipality string) ([]model.CommunalProblem, error) {
	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	filter := bson.D{{"municipality", municipality}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		panic(err)
	}

	var problems []model.CommunalProblem
	if err = cursor.All(ctx, &problems); err != nil {
		log.Fatal(err)
	}
	fmt.Println(problems)

	return problems, nil
}

func (r Repository) GetCommunalProblemsByPoliceman(policemanId string) ([]model.CommunalProblem, error) {
	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	filter := bson.D{{"policemanId", policemanId}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		panic(err)
	}

	var users []model.CommunalProblem
	if err = cursor.All(ctx, &users); err != nil {
		log.Fatal(err)
	}
	fmt.Println(users)

	return users, nil
}

func (r Repository) GetListOfMunicipality() ([]string, error) {
	var allMunicipality []string
	communalProblems, err := r.GetAllCommunalProblems()
	if err != nil {
		log.Fatal(err)
	}

	for _, problem := range communalProblems {
		allMunicipality = append(allMunicipality, problem.Municipality)
	}

	finalList := RemoveDuplicateStr(allMunicipality)

	return finalList, nil
}

func (r Repository) GetStatisticData() (model.StatisticData, error) {
	anonymous := 0
	public := 0

	communalProblems, err := r.GetAllCommunalProblems()
	if err != nil {
		log.Fatal(err)
	}

	for _, problem := range communalProblems {
		if problem.Anonymous == true {
			anonymous += 1
		} else {
			public += 1
		}
	}

	statisticData := model.StatisticData{
		TotalProblems: strconv.Itoa(len(communalProblems)),
		Anonymous:     strconv.Itoa(anonymous),
		Public:        strconv.Itoa(public),
	}

	return statisticData, nil
}

func (r Repository) GetCommunalProblemsByCitizen(policemanId string) ([]model.CommunalProblem, error) {
	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	filter := bson.D{{"reportedById", policemanId}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		panic(err)
	}
	var communalProblems []model.CommunalProblem
	if err = cursor.All(ctx, &communalProblems); err != nil {
		fmt.Println(err)
	}
	return communalProblems, nil
}

func (r Repository) GetCommunalProblemsById(id string) ([]model.CommunalProblem, error) {
	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	filter := bson.D{{"id", id}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		panic(err)
	}
	var communalProblems []model.CommunalProblem
	if err = cursor.All(ctx, &communalProblems); err != nil {
		fmt.Println(err)
	}
	return communalProblems, nil
}

func (r Repository) AddReport(id string, report string) error {
	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	_, err := collection.UpdateOne(
		ctx,
		bson.M{"id": id},
		bson.D{
			{"$set", bson.D{{"report", report}}},
		},
	)
	if err != nil {
		fmt.Println(err)
	}
	return nil
}

func (r Repository) ImproveProblem(id string, report string) error {
	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	_, err := collection.UpdateOne(
		ctx,
		bson.M{"id": id},
		bson.D{
			{"$set", bson.D{{"improvement", report}}},
		},
	)
	if err != nil {
		fmt.Println(err)
	}
	return nil
}

func (r Repository) SentToCourt(id string) error {
	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	_, err := collection.UpdateOne(
		ctx,
		bson.M{"id": id},
		bson.D{
			{"$set", bson.D{{"sent", true}}},
		},
	)
	if err != nil {
		fmt.Println(err)
	}
	return nil
}

func (r Repository) SolveCommunalProblem(id string) error {
	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	_, err := collection.UpdateOne(
		ctx,
		bson.M{"id": id},
		bson.D{
			{"$set", bson.D{{"solved", true}}},
		},
	)
	if err != nil {
		fmt.Println(err)
	}
	return nil
}

func (r Repository) AssignCommunalProblem(id string) error {
	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	token, tokenErr := r.CheckToken(ctx)
	if tokenErr != nil {
		// err
	}

	parsedToken, _ := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return []byte("gosecretkey"), nil
	})

	claims, ok := parsedToken.Claims.(jwt.MapClaims)

	if !ok {
		return errors.New("Invalid token")
	}

	userRole := ""
	policemanJmbg := ""

	for key, val := range claims {
		if key == "role" {
			userRole += val.(string)
		}
		if key == "username" {
			policemanJmbg += val.(string)
		}
	}

	_, err := collection.UpdateOne(
		ctx,
		bson.M{"id": id},
		bson.D{
			{"$set", bson.D{{"policemanId", policemanJmbg}}},
		},
	)
	if err != nil {
		fmt.Println(err)
	}
	return nil
}

func (r Repository) UpdateCommunalProblem(id string, communalProblem model.CommunalProblem) error {
	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	_, err := collection.UpdateOne(
		ctx,
		bson.M{"id": id},
		bson.D{
			{"$set", bson.D{{"title", communalProblem.Title}}},
			{"$set", bson.D{{"description", communalProblem.Description}}},
			{"$set", bson.D{{"date", communalProblem.Date}}},
			{"$set", bson.D{{"report", communalProblem.Report}}},
			{"$set", bson.D{{"policemanId", communalProblem.PolicemanId}}},
			{"$set", bson.D{{"reportedById", communalProblem.ReportedById}}},
			{"$set", bson.D{{"address", communalProblem.Address}}},
			{"$set", bson.D{{"accepted", communalProblem.Accepted}}},
			{"$set", bson.D{{"solved", communalProblem.Solved}}},
			{"$set", bson.D{{"anonymous", communalProblem.Anonymous}}},
			{"$set", bson.D{{"imageUrl", communalProblem.ImageUrl}}},
			{"$set", bson.D{{"improvement", communalProblem.Improvement}}},
			{"$set", bson.D{{"sent", communalProblem.Sent}}},
			{"$set", bson.D{{"judgeId", communalProblem.JudgeId}}},
			{"$set", bson.D{{"municipality", communalProblem.Municipality}}},
		},
	)
	if err != nil {
		fmt.Println(err)
	}
	return nil
}

func (r Repository) CheckToken(ctx context.Context) (string, error) {
	authClient, _ := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://auth-db:27017"))
	collection := authClient.Database("AUTH").Collection("token")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	result, err := collection.Find(ctx, bson.D{})
	if err != nil {
		panic(err)
	}

	var tokens []model.Token

	if err = result.All(ctx, &tokens); err != nil {
		fmt.Println(err)
	}
	println("TOKENI")
	println(tokens)
	println("TOKENI")

	var foundedToken = tokens[0].Token
	return foundedToken, nil
}
