package server

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"net/url"
)

func HandlerLogout(ctx *gin.Context) {
	logoutUrl, err := url.Parse("https://dev-xd1sqt4xwi2fj3r4.us.auth0.com/v2/logout")
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}

	scheme := "http"
	if ctx.Request.TLS != nil {
		scheme = "https"
	}

	returnTo, err := url.Parse(scheme + "://" + ctx.Request.Host)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}

	parameters := url.Values{}
	parameters.Add("returnTo", returnTo.String())
	parameters.Add("client_id", "3trBDTD1UQPNatlnfJue4m9KVMQjjDZF")
	logoutUrl.RawQuery = parameters.Encode()

	ctx.Redirect(http.StatusTemporaryRedirect, logoutUrl.String())
}
