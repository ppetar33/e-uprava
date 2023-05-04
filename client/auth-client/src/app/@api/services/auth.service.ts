import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { environment } from "src/environments/environment";
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly APIurl = `${environment.APIurl}/auth`;
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn$.asObservable();
  public _insertedID = new BehaviorSubject<string>("");
  public insertedID = this._insertedID.asObservable();
  public _loggedInUsername$ = new BehaviorSubject<string>("");
  public loggedInUsername$ = this._loggedInUsername$.asObservable();
  private decodedToken: any;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) { 
    const token = localStorage.getItem("token");
    this._isLoggedIn$.next(!!token);
  }

  public login(auth: any): Observable<any> {
    return this.httpClient.post(`${this.APIurl}/login`,
      {
        jmbg: auth.jmbg,
        password: auth.password,
      },
      { responseType: "text" }
    ).pipe(tap((token: any) => {
        const tokenValue = JSON.parse(token);
        let tokenObject = tokenValue.token.replaceAll('"','');
        this.decodedToken = this.tokenService.decodeToken(tokenObject);
        if (this.decodedToken) {
          this._isLoggedIn$.next(true);
          this._loggedInUsername$.next(this.decodedToken.username);
          this.tokenService.setToken(tokenObject);
          if (tokenValue.redirectUrl) {
            window.open(tokenValue.redirectUrl);
            window.location.href = 'about:blank';
          }
        } else {
          console.log("Invalid token");
        }
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  public isLoggedIn(): any {
    return !!localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  public loginAuth(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/api/auth/login');
  }

  public logoutAuth(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/api/auth/logout');
  }
}
