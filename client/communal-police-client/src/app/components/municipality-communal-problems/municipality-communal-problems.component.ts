import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunalPoliceServiceService } from 'src/app/services/communal-police-service.service';
import { CommunalProblem } from 'src/app/model/communal-problem';
import { CommunalProblemCardComponent } from '../communal-problem-card/communal-problem-card.component';
import { Token } from 'src/app/model/token';
import jwtDecode from "jwt-decode";
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-municipality-communal-problems',
  templateUrl: './municipality-communal-problems.component.html',
  styleUrls: ['./municipality-communal-problems.component.css']
})
export class MunicipalityCommunalProblemsComponent implements OnInit {

  communalProblems: CommunalProblem[];
  user: User | undefined;
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
          this.getUserByJMBG(this.id);
          console.log("Autorizovan");
        } else {
          console.log("Nije Autorizovan");
        }
			}
		);
  }

  getUserByJMBG(jmbg: string){
    this.communalPoliceService.getUserByJMBG(jmbg).subscribe(
			res => {
				this.user = res.body as User;
        console.log(res.body);
        if (this.user.municipality != ""){
          this.communalPoliceService.getByMunicipality(this.user.municipality).subscribe( resProblems => {
            // this.communalProblems = resProblems.body as CommunalProblem[];
            let list = resProblems.body as CommunalProblem[];
            let tempList: CommunalProblem[] = []
            list.forEach( item => {
              if (!item.sent && item.policemanId == ""){
                tempList.push(item)
              }
            });
            this.communalProblems = tempList
          })
        }
			}
		);
  }
}
