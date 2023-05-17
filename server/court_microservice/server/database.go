package server

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/google/uuid"
	"github.com/ppetar33/e-uprava/court_microservice/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"io"
	"net/http"
	"time"
)

var client *mongo.Client

func ConnectToAuthDatabase() (*mongo.Client, error) {
	ctx, err := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://court-db:27017"))

	defer err()

	if err == nil {
		fmt.Println("Error with database")
	}

	return client, nil
}

func WriteIntoCommunalProblems(communalProblem *model.CommunalProblem) (*mongo.InsertOneResult, error) {

	judges, err := GetAllJudges()
	if err != nil {
		return nil, err
	}

	numCommunalProblemsPerJudge := make(map[string]int)
	for _, judge := range judges {
		numCommunalProblemsPerJudge[judge.Id] = 0
	}
	communalProblems, err := GetAllCommunalProblems()
	if err != nil {
		return nil, err
	}
	for _, problem := range communalProblems {
		numCommunalProblemsPerJudge[problem.JudgeId]++
	}

	minNumCommunalProblems := len(communalProblems)
	minJudge := judges[0]
	for _, judge := range judges {
		if numCommunalProblemsPerJudge[judge.Id] < minNumCommunalProblems {
			minNumCommunalProblems = numCommunalProblemsPerJudge[judge.Id]
			minJudge = judge
		}
	}

	communalProblem.JudgeId = minJudge.Id

	_, err = AddCommunalProblem(communalProblem)
	if err != nil {
		return nil, err
	}

	return nil, nil
}

func AddCommunalProblem(communalProblem *model.CommunalProblem) (*mongo.InsertOneResult, error) {
	collection := client.Database("COURT").Collection("communalProblems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	result, err := collection.InsertOne(ctx, communalProblem)
	return result, err
}

func GetAllCommunalProblems() ([]model.CommunalProblem, error) {
	collection := client.Database("COURT").Collection("communalProblems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		panic(err)
	}
	var communalProblems []model.CommunalProblem
	if err = cursor.All(ctx, &communalProblems); err != nil {
		fmt.Println(err)
	}
	return communalProblems, nil
}

func GetCommunalProblemsByJudge(judgeId string) ([]model.CommunalProblem, error) {
	collection := client.Database("COURT").Collection("communalProblems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	filter := bson.D{{"judgeId", judgeId}}

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

func AcceptCommunalProblem(id string, dateHearing string) error {
	collection := client.Database("COURT").Collection("communalProblems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	_, err := collection.UpdateOne(
		ctx,
		bson.M{"id": id},
		bson.D{
			{"$set", bson.D{{"accepted", true}}},
			{"$set", bson.D{{"hearing", true}}},
			{"$set", bson.D{{"dateHearing", dateHearing}}},
		},
	)
	if err != nil {
		fmt.Println(err)
	}
	return nil
}

func SolveCommunalProblem(id string) error {
	collection := client.Database("COURT").Collection("communalProblems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	_, err := collection.UpdateOne(
		ctx,
		bson.M{"id": id},
		bson.D{
			{"$set", bson.D{{"solved", true}}},
			{"$set", bson.D{{"hearing", true}}},
		},
	)
	if err != nil {
		fmt.Println(err)
	}
	return nil
}

func DeclineCommunalProblem(id string, improvement *model.Improvement) error {
	collection := client.Database("COURT").Collection("communalProblems")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	_, err := collection.UpdateOne(
		ctx,
		bson.M{"id": id},
		bson.D{
			{"$set", bson.D{{"accepted", false}}},
			{"$set", bson.D{{"improvement", improvement.Text}}},
		},
	)
	if err != nil {
		fmt.Println(err)
	}
	return nil
}

func GetCommunalProblemById(id string) model.CommunalProblem {
	collection := client.Database("COURT").Collection("communalProblems")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	var communalProblem model.CommunalProblem
	err := collection.FindOne(ctx, bson.D{{"id", id}}).Decode(&communalProblem)
	if err != nil {
		fmt.Println("Doesn't exist communal problem with this id")
	}
	return communalProblem
}

func WriteIntoJudges(judge *model.Judge) (*mongo.InsertOneResult, error) {
	collection := client.Database("JUDGE").Collection("judges")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	judge.Id = uuid.New().String()

	result, err := collection.InsertOne(ctx, judge)
	return result, err
}

func GetAllJudges() ([]model.Judge, error) {
	client := http.Client{
		Timeout: time.Second * 60000,
	}
	path := "http://auth-microservice:8080/api/auth/judges"
	req, err := http.NewRequest("GET", path, nil)
	if err != nil {
		return nil, err
	}

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("error status: " + resp.Status)
	}

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var judges []model.Judge
	errUnmarshal := json.Unmarshal(bodyBytes, &judges)
	if errUnmarshal != nil {
		return nil, errUnmarshal
	}

	return judges, nil
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
