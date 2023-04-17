
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class NoAccessGuard implements CanActivate {

  constructor(private authenticationService: AuthService, private router: Router) { }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authenticationService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['feed']);
      return false;
    }
  }
}