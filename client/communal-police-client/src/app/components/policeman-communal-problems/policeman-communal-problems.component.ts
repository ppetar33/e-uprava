import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunalPoliceServiceService } from 'src/app/services/communal-police-service.service';
import { CommunalProblem } from 'src/app/model/communal-problem';
import { CommunalProblemCardComponent } from '../communal-problem-card/communal-problem-card.component';
import { Token } from 'src/app/model/token';
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-policeman-communal-problems',
  templateUrl: './policeman-communal-problems.component.html',
  styleUrls: ['./policeman-communal-problems.component.css']
})
export class PolicemanCommunalProblemsComponent implements OnInit {

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
          this.getAllCommunalProblemsByPoliceman(this.id);
          console.log("Autorizovan");
        } else {
          console.log("Nije Autorizovan");
        }
			}
		);
  }

  getAllCommunalProblemsByPoliceman(id: string){
    this.communalPoliceService.getByPoliceman(id).subscribe(
			resProblems => {
        let list = resProblems.body as CommunalProblem[];
            let tempList: CommunalProblem[] = []
            list.forEach( item => {
              if (!item.sent){
                tempList.push(item)
              }
            });
            this.communalProblems = tempList
				// this.communalProblems = res.body as CommunalProblem[];
        console.log(resProblems.body);
			}
		);
  }
}
