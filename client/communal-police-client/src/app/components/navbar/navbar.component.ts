import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { Token } from 'src/app/model/token';
import { CommunalPoliceServiceService } from 'src/app/services/communal-police-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: Token | undefined;
  public isLoggedin: boolean = false;

  
  constructor(
    private router: Router,
    private communalPoliceService : CommunalPoliceServiceService,
  ) { 
  }

  ngOnInit(): void {
    this.communalPoliceService.isAuthenticated().subscribe(
			res => {
				this.token = res.body as Token;
        console.log(res.body);
        console.log(this.token)

        if(this.token.token != "" && res.body != "Not authenticated"){
          this.isLoggedin = true
          console.log("Autorizovan")
        } else {
          console.log("Nije Autorizovan")
          window.location.href = "http://localhost:4200/home"
          // window.location.reload();
        }
			}
		);
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

  logout(){
    this.communalPoliceService.logoutAuth().subscribe(
			res => {
        window.location.href = "http://localhost:4200/home"
			}
		);
  }
}
