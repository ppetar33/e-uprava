import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@api/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public itemsList: Array<string> = ['HOME', 'COMMUNAL PROBLEMS'];
  public activeIndex: number = 0;
  public isLoggedin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.activeIndex = localStorage.getItem('nav') ? Number(JSON.parse(localStorage.getItem('nav') || '')) : 0;
    this.authenticated();
  }

  public goToPage(page: string, index: number): void {
    this.activeIndex = index;
    localStorage.setItem('nav', JSON.stringify(this.activeIndex));
    this.router.navigate([page === 'COMMUNAL PROBLEMS' ? 'judge/problems' : `judge/${page.toLowerCase()}`]);
  }

  public authenticated(): void {
    this.authService.authenticated().subscribe((resp) => {
      if (resp.token) {
        localStorage.setItem('token', resp.token);
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
        window.location.href = "http://localhost:4200/home"
      }
    })
  }

  public logout(): void {
    this.authService.logoutAuth().subscribe((resp) => {
      localStorage.clear();
      window.location.reload();
      this.router.navigate(['']);
    });
  }
}
