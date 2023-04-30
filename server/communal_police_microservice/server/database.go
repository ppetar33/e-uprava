package server

import (
	"communal_police_microservice/model"
	"context"
	"errors"
	"fmt"
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
