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

func (r Repository) GetCommunalProblemsByPoliceman(policemanId string) ([]model.CommunalProblem, error) {
	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	filter := bson.D{{"policemanId", policemanId}}

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

func (r Repository) GetCommunalProblemsByCitizen(policemanId string) ([]model.CommunalProblem, error) {
	collection := client.Database("COMMUNAL_POLICE").Collection("communal_problems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	filter := bson.D{{"policemanId", policemanId}}

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
