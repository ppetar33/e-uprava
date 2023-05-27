package main

import (
	"github.com/dgrijalva/jwt-go"
	"log"
	"net/http"
)

func ValidateJWT(next func(w http.ResponseWriter, r *http.Request)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		var SECRET = []byte("gosecretkey")

		if r.Header["Token"] != nil {
			token, err := jwt.Parse(r.Header["Token"][0], func(t *jwt.Token) (interface{}, error) {
				if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
					w.WriteHeader(http.StatusUnauthorized)
					w.Write([]byte("Not Authorized"))
				}
				return SECRET, nil
			})

			if err != nil {
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte("Not Authorized: " + err.Error()))
			}

			claims := jwt.MapClaims{}

			tokenWithClaims, _ := jwt.ParseWithClaims(r.Header["Token"][0], claims, func(token *jwt.Token) (interface{}, error) {
				return []byte(r.Header["Token"][0]), nil
			})

			log.Printf("Token with claims, ", tokenWithClaims)

			if token.Valid {
				next(w, r)
			}

		} else {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Not Authorized"))
		}
	})
}
