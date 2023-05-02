package server

import (
	"context"
	"fmt"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"open_data_microservice/model"
	"time"
)

var client *mongo.Client

type Repository struct {
}

func ConnectToOpenDataDatabase() (*mongo.Client, error) {
	ctx, err := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://open-data-db:27017"))

	defer err()

	if err == nil {
		fmt.Println("Error with database")
	}

	return client, nil
}

func (r Repository) GetAllCommunalCops() ([]model.CommunalCop, error) {

	communalCops := []model.CommunalCop{
		model.CommunalCop{
			Id:        uuid.New().String(),
			FirstName: "John",
			LastName:  "Doe",
			Password:  "password",
			Jmbg:      "1234567890123",
			Email:     "john.doe@example.com",
			City:      "New York",
			Role:      "cop",
		},
		model.CommunalCop{
			Id:        uuid.New().String(),
			FirstName: "Jane",
			LastName:  "Doe",
			Password:  "password",
			Jmbg:      "1234567890124",
			Email:     "jane.doe@example.com",
			City:      "Los Angeles",
			Role:      "cop",
		},
		model.CommunalCop{
			Id:        uuid.New().String(),
			FirstName: "Bob",
			LastName:  "Smith",
			Password:  "password",
			Jmbg:      "1234567890125",
			Email:     "bob.smith@example.com",
			City:      "Chicago",
			Role:      "cop",
		},
	}

	return communalCops, nil
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
