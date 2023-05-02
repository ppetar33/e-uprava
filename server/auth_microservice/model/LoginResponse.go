package model

type LoginResponse struct {
	Token       string `json:"token"`
	RedirectURL string `json:"redirectUrl"`
}
