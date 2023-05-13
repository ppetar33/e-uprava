import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { Token } from 'src/app/model/token';
import { CommunalPoliceServiceService } from 'src/app/services/communal-police-service.service';
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: Token | undefined;
  tokenObj: any;
  role: string;
  public isLoggedin: boolean = false;

  
  constructor(
    private router: Router,
    private communalPoliceService : CommunalPoliceServiceService,
  ) { 
    this.role = "";
  }

  ngOnInit(): void {
    this.communalPoliceService.isAuthenticated().subscribe(
			res => {
				this.token = res.body as Token;
        console.log(res.body);
        console.log(this.token)

        if(this.token.token != "" && res.body != "Not authenticated"){
          this.isLoggedin = true;
          console.log(this.token.token);
          this.tokenObj = jwtDecode(this.token.token);
          this.role = this.tokenObj.role;
          console.log(this.role);
          console.log("Autorizovan");
        } else {
          console.log("Nije Autorizovan");
          window.location.href = "http://localhost:4200/home";
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
    this.router.navigate(['policeman-communal-problem']);
  }

  logout(){
    this.communalPoliceService.logoutAuth().subscribe(
			res => {
        window.location.href = "http://localhost:4200/home"
			}
		);
  }
}
