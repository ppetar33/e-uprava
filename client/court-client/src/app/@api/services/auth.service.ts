import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }


  public isLoggedIn(): any {
    return !!localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
