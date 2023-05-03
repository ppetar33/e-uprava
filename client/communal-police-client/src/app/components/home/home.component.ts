import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunalPoliceServiceService } from 'src/app/services/communal-police-service.service';
import { CommunalProblem } from 'src/app/model/communal-problem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  communalProblems: CommunalProblem[] | undefined;


  constructor(
    private router: Router,
    private communalPoliceService : CommunalPoliceServiceService,
  ) { }

  ngOnInit(): void {
    console.log("Home ekran");

  }

  createCommunalProblem(event: any) {
    this.router.navigate(['create-communal-problem']);
  }

  getAllCommunalProblems(){
    this.communalPoliceService.getAll().subscribe(
			res => {
				this.communalProblems = res.body as CommunalProblem[];
        console.log(res.body);
			}
		);
  }

}
