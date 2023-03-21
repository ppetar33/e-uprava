import { Injectable } from "@angular/core";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  constructor() {}

  public getToken() {
    return localStorage.getItem("token");
  }

  public setToken(value: string) {
    localStorage.setItem("token", value);
  }

  public removeToken() {
    localStorage.removeItem("token");
  }

  public decodeToken(token: string) {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  public tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    console.log(expiry);
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  public whenTokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return expiry;
  }

  public didTokenExpired() {
    const expired = this.tokenExpired(JSON.stringify(this.getToken()));
    return expired;
  }
}