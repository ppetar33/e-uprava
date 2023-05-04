import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthService as AuthenticationService } from 'src/app/@api/services/auth.service';
import { LoginComponent } from 'src/app/@pages/login/login.component';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public itemsList: Array<string> = ['HOME','STAFF', 'ABOUT'];
  public activeIndex: number = 0;
  public isLoggedin: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public auth: AuthService,
    private authService: AuthenticationService
  ) { }

  public ngOnInit(): void {
    this.activeIndex = localStorage.getItem('nav') ? Number(JSON.parse(localStorage.getItem('nav') || '')) : 0;
  }

  public goToPage(page: string, index: number): void {
    this.activeIndex = index;
    localStorage.setItem('nav', JSON.stringify(this.activeIndex));
    this.router.navigate([page.toLowerCase()]);
  }

  public openLoginDialog(): void {
    const dialogRef = new MatDialogConfig();
    dialogRef.disableClose = true;
    dialogRef.autoFocus = false;
    this.dialog.open(LoginComponent, dialogRef);
  }

  public logout(): void {
    localStorage.clear();
    this.auth.logout();
  }
}