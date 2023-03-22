import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/@pages/login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public itemsList: Array<string> = ['HOME', 'ABOUT'];
  public activeIndex: number = 0;

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.activeIndex = Number(JSON.parse(localStorage.getItem('nav') || ''));
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
}
