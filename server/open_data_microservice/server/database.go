package server

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"open_data_microservice/model"
	"time"
)

var client *mongo.Client

func ConnectToOpenDataDatabase() (*mongo.Client, error) {
	ctx, err := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://open-data-db:27018"))

	defer err()

	if err == nil {
		fmt.Println("Error with database")
	}

	return client, nil
}

func GetAllCops() ([]model.User, error) {

	users := []model.User{
		{Id: "1", Name: "John", LastName: "Doe", Jmbg: "1234567890123", Password: "password1", Email: "john.doe@example.com", Role: "cop", PhoneNumber: "555-1234", Address: "123 Main St."},
		{Id: "2", Name: "Jane", LastName: "Doen", Jmbg: "1234567890124", Password: "password2", Email: "jane.doe@example.com", Role: "cop", PhoneNumber: "555-5678", Address: "456 Elm St."},
		{Id: "3", Name: "Bob", LastName: "Smith", Jmbg: "1234567890125", Password: "password3", Email: "bob.smith@example.com", Role: "cop", PhoneNumber: "555-4321", Address: "789 Oak St."},
		{Id: "4", Name: "Alice", LastName: "Johnson", Jmbg: "1234567890126", Password: "password4", Email: "alice.johnson@example.com", Role: "cop", PhoneNumber: "555-8765", Address: "321 Pine St."},
		{Id: "5", Name: "Tom", LastName: "Wilson", Jmbg: "1234567890127", Password: "password5", Email: "tom.wilson@example.com", Role: "cop", PhoneNumber: "555-2468", Address: "654 Cedar St."},
	}

	return users, nil
}

func GetAllJudges() ([]model.User, error) {

	users := []model.User{
		{Id: "1", Name: "Liam", LastName: "Brown", Jmbg: "1234567890123", Password: "password1", Email: "liam.brown@example.com", Role: "judge", PhoneNumber: "(555) 123-4567", Address: "Oak Road"},
		{Id: "2", Name: "Emma", LastName: "Garcia", Jmbg: "1234567890124", Password: "password2", Email: "emma.garcia@example.com", Role: "judge", PhoneNumber: "(987) 654-3210", Address: "Cedar Lane"},
		{Id: "3", Name: "Noah", LastName: "Rodriguez", Jmbg: "1234567890125", Password: "password3", Email: "noah.rodriguez@example.com", Role: "judge", PhoneNumber: "(123) 456-7890", Address: "Park Place"},
		{Id: "4", Name: "Sophia", LastName: "Hernandez", Jmbg: "1234567890126", Password: "password4", Email: "sophia.hernandez@example.com", Role: "judge", PhoneNumber: "(555) 867-5309", Address: "Chestnut Street"},
		{Id: "5", Name: "William", LastName: "Perez", Jmbg: "1234567890127", Password: "password5", Email: "william.perez@example.com", Role: "judge", PhoneNumber: "(888) 555-1212", Address: "Walnut Avenue"},
	}

	return users, nil
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
