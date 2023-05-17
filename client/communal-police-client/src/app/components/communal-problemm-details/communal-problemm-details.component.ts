import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunalProblem } from 'src/app/model/communal-problem';
import { CommunalPoliceServiceService } from 'src/app/services/communal-police-service.service';
import { Token } from 'src/app/model/token';
import jwtDecode from "jwt-decode";


@Component({
  selector: 'app-communal-problemm-details',
  templateUrl: './communal-problemm-details.component.html',
  styleUrls: ['./communal-problemm-details.component.css']
})
export class CommunalProblemmDetailsComponent implements OnInit {

  problems: CommunalProblem[];
  id: string;
  loaded: boolean;
  token: Token | undefined;
  tokenObj: any;
  userId: string;
  role: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communalPoliceService : CommunalPoliceServiceService,
  ) { 
    this.id = ""
    this.userId = ""
    this.role = ""
    this.loaded = false
    this.problems = []
  }

  ngOnInit(): void {
    this.loaded = false

    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.communalPoliceService.getById(this.id).subscribe(
      res => {
        this.problems = res.body as CommunalProblem[];
        console.log(res.body);
        this.loaded = true;

      });
    });

    this.communalPoliceService.isAuthenticated().subscribe(
			res => {
				this.token = res.body as Token;
        console.log(res.body);
        console.log(this.token)
        if(this.token.token != "" && res.body != "Not authenticated"){
          console.log(this.token.token);
          this.tokenObj = jwtDecode(this.token.token);
          this.userId = this.tokenObj.username
          this.role = this.tokenObj.role
          console.log(this.userId);
          console.log("Autorizovan");
        } else {
          console.log("Nije Autorizovan");
        }
			}
		);
  }

  saveReport(event: Event){
    this.communalPoliceService.addReport(this.problems[0]).subscribe(res => {
      console.log("Succesfull save")
      this.router.navigate(['home']);
    },
      err => {
        console.log("Error")
      })
  }

  sendToCourt(event: Event){
    console.log(this.loaded);
    console.log(this.problems[0])
    this.communalPoliceService.sendToCOurt(this.problems[0]).subscribe(res => {
      console.log("Succesfull send to court")
      this.communalPoliceService.sendToCourtCommunalPolice(this.problems[0]).subscribe(res => {
        this.router.navigate(['home']);
      });
    },
      err => {
        console.log("Error")
      })

  }

  accept(event: Event){
    console.log(this.loaded);
    console.log(this.loaded);
    this.communalPoliceService.acceptByPoliceman(this.problems[0]).subscribe(res => {
      console.log("Succesfull save")
      this.router.navigate(['home']);
    },
      err => {
        console.log("Error")
      })
  }

}
