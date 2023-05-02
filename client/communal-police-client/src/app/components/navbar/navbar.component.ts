import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  homeClick(event: any) {
    this.router.navigate(['home']);
  }

  createReportClick(event: any) {
    this.router.navigate(['create-communal-problem']);
  }

  yourReportsClick(event: any) {
    this.router.navigate(['create-communal-problem']);
  }

}
