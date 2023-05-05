import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly APIurl = `${environment.APIurl}/auth`;

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }


  public isLoggedIn(): any {
    return !!localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  public authenticated(): Observable<any> {
    return this.httpClient.get(`${this.APIurl}/authenticated`);
  }

  public logoutAuth(): Observable<any> {
    return this.httpClient.post(`${this.APIurl}/logout`, {});
  }

}
