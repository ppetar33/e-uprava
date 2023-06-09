import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunalPoliceServiceService } from 'src/app/services/communal-police-service.service';
import { CommunalProblem } from 'src/app/model/communal-problem';
import { CommunalProblemCardComponent } from '../communal-problem-card/communal-problem-card.component';
import { Token } from 'src/app/model/token';
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  communalProblems: CommunalProblem[];
  token: Token | undefined;
  tokenObj: any;
  id: string;

  constructor(
    private router: Router,
    private communalPoliceService : CommunalPoliceServiceService,
  ) { 
    this.communalProblems = []
    this.id = "";

  }

  ngOnInit(): void {
    console.log("Home ekran");
    this.communalPoliceService.isAuthenticated().subscribe(
			res => {
				this.token = res.body as Token;
        console.log(res.body);
        console.log(this.token)

        if(this.token.token != "" && res.body != "Not authenticated"){
          console.log(this.token.token);
          this.tokenObj = jwtDecode(this.token.token);
          this.id = this.tokenObj.username
          console.log(this.id);
          this.getAllCommunalProblemsByCitizen(this.id);
          console.log("Autorizovan");
        } else {
          console.log("Nije Autorizovan");
        }
			}
		);

  }

  createCommunalProblem(event: any) {
    this.router.navigate(['create-communal-problem']);
  }

  // getAllCommunalProblems(){
  //   this.communalPoliceService.getAll().subscribe(
	// 		res => {
	// 			this.communalProblems = res.body as CommunalProblem[];
  //       console.log(res.body);
	// 		}
	// 	);
  // }

  getAllCommunalProblemsByCitizen(id: string){
    this.communalPoliceService.getByCitizen(id).subscribe(
			res => {
				this.communalProblems = res.body as CommunalProblem[];
        console.log(res.body);
			}
		);
  }

}
