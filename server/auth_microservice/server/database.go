package server

import (
	"context"
	"errors"
	"fmt"
	"github.com/coreos/go-oidc/v3/oidc"
	"github.com/google/uuid"
	"github.com/ppetar33/e-uprava/auth_microservice/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/oauth2"
	"log"
	"time"
)

type Authenticator struct {
	*oidc.Provider
	oauth2.Config
}

func New() (*Authenticator, error) {
	provider, err := oidc.NewProvider(
		context.Background(),
		"https://dev-xd1sqt4xwi2fj3r4.us.auth0.com/",
	)
	if err != nil {
		return nil, err
	}

	conf := oauth2.Config{
		ClientID:     "3trBDTD1UQPNatlnfJue4m9KVMQjjDZF",
		ClientSecret: "1uL6OFxpOLXZX4dfuEpVEZGzfwhaxEv69w69pHCT-9niAMStDFpk8_-Qos8MtGb0",
		RedirectURL:  "http://localhost:4200",
		Endpoint:     provider.Endpoint(),
		Scopes:       []string{oidc.ScopeOpenID, "profile"},
	}

	return &Authenticator{
		Provider: provider,
		Config:   conf,
	}, nil
}

// VerifyIDToken verifies that an *oauth2.Token is a valid *oidc.IDToken.
func (a *Authenticator) VerifyIDToken(ctx context.Context, token *oauth2.Token) (*oidc.IDToken, error) {
	rawIDToken, ok := token.Extra("id_token").(string)
	if !ok {
		return nil, errors.New("no id_token field in oauth2 token")
	}

	oidcConfig := &oidc.Config{
		ClientID: a.ClientID,
	}

	return a.Verifier(oidcConfig).Verify(ctx, rawIDToken)
}

var client *mongo.Client

func ConnectToAuthDatabase() (*mongo.Client, error) {
	ctx, err := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://auth-db:27017"))

	defer err()

	if err == nil {
		fmt.Println("Error with database")
	}

	return client, nil
}

func Login(user *model.Auth) (string, string, error) {
	var dbUser model.Auth

	collection := client.Database("AUTH").Collection("user")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	err := collection.FindOne(ctx, bson.M{"jmbg": user.Jmbg}).Decode(&dbUser)

	defer cancel()

	if err != nil {
		return "Wrong Credentials", "", nil
	}

	userPass := []byte(user.Password)
	dbPass := []byte(dbUser.Password)

	passErr := bcrypt.CompareHashAndPassword(dbPass, userPass)

	if passErr != nil {
		return "Wrong Credentials", "", nil
	}

	jwtToken, errToken := GenerateJWT(user.Jmbg, dbUser.Role, dbUser.Id)
	if errToken != nil {
		return `{"message":"` + errToken.Error() + `"}`, "", nil
	}

	tokenCollection := client.Database("AUTH").Collection("token")
	_, err = tokenCollection.DeleteMany(ctx, bson.M{})
	t := model.Token{jwtToken}
	res, errr := tokenCollection.InsertOne(ctx, t)

	if err != nil {
		print("Greška brisanja svih tokena")
	}

	println(res)

	if errr != nil {
		println("Greška upisivanja tokena")
		println(errr.Error())
	}

	println("SAČUVAN JE TOKEN")
	println(t.Token)

	return jwtToken, dbUser.Role, nil
}

func Authenticated() (model.Token, error) {
	collection := client.Database("AUTH").Collection("token")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	var token model.Token
	err := collection.FindOne(ctx, bson.D{}).Decode(&token)
	if err != nil {
		fmt.Println("error")
	}
	return token, nil
}

func GetUserById(id string) model.Auth {
	collection := client.Database("AUTH").Collection("user")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	var user model.Auth
	err := collection.FindOne(ctx, bson.D{{"id", id}}).Decode(&user)
	if err != nil {
		fmt.Println("Doesn't exist user with this id")
	}
	return user
}

func GetAllUsers() ([]model.Auth, error) {
	collection := client.Database("AUTH").Collection("user")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		panic(err)
	}
	var users []model.Auth
	if err = cursor.All(ctx, &users); err != nil {
		fmt.Println(err)
	}
	return users, nil
}

func GetAllJudges() ([]model.Auth, error) {
	collection := client.Database("AUTH").Collection("user")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	filter := bson.D{{"role", "judge"}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		panic(err)
	}
	var users []model.Auth
	if err = cursor.All(ctx, &users); err != nil {
		fmt.Println(err)
	}
	return users, nil
}

func RegisterUser(user *model.Auth) (*mongo.InsertOneResult, error) {
	authResult, err := WriteUserIntoDatabase(user)

	if err != nil {
		fmt.Println(err)
	}

	return authResult, nil
}

func Logout() (string, error) {

	tokenCollection := client.Database("AUTH").Collection("token")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	_, err := tokenCollection.DeleteMany(ctx, bson.M{})

	if err != nil {
		fmt.Println(err)
	}

	return "", nil
}

func WriteUserIntoDatabase(user *model.Auth) (*mongo.InsertOneResult, error) {
	collection := client.Database("AUTH").Collection("user")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	var auth model.Auth

	auth.Id = uuid.New().String()
	auth.Password = GetHash([]byte(user.Password))
	auth.Username = user.Username
	auth.FirstName = user.FirstName
	auth.LastName = user.LastName
	auth.Jmbg = user.Jmbg
	auth.Email = user.Email
	auth.Role = user.Role
	auth.Municipality = user.Municipality
	auth.Court = user.Court

	resultAuth, _ := collection.InsertOne(ctx, auth)

	fmt.Println("****** Result inserted into AUTH database   ******  : ", auth)

	return resultAuth, nil
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

func GetJudges() ([]model.Auth, error) {
	collection := client.Database("AUTH").Collection("user")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	filter := bson.D{{"role", "judge"}}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		panic(err)
	}
	var users []model.Auth
	if err = cursor.All(ctx, &users); err != nil {
		log.Fatal(err)
	}
	fmt.Println(users)

	return users, nil
}

func GetListOfMunicipality() ([]string, error) {
	var allMunicipality []string
	users, err := GetJudges()
	if err != nil {
		log.Fatal(err)
	}

	for _, user := range users {
		allMunicipality = append(allMunicipality, user.Municipality)
	}

	finalList := RemoveDuplicateStr(allMunicipality)

	return finalList, nil
}

func GetJudgeByMunicipality(municipality string) ([]model.Auth, error) {
	collection := client.Database("AUTH").Collection("user")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	filter := bson.M{"role": "judge", "municipality": municipality}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		panic(err)
	}
	var users []model.Auth
	if err = cursor.All(ctx, &users); err != nil {
		log.Fatal(err)
	}
	fmt.Println(users)

	return users, nil
}

func Disconnect(ctx context.Context) error {
	err := client.Disconnect(ctx)
	if err != nil {
		return err
	}
	return nil
}
