import { Component, OnInit } from '@angular/core';
import { CommunalProblem } from 'src/app/@api/model/communal-problem.model';
import { CommunalProblemService } from 'src/app/@api/services/communal-problem.service';

@Component({
  selector: 'app-communal-problems',
  templateUrl: './communal-problems.component.html',
  styleUrls: ['./communal-problems.component.scss']
})
export class CommunalProblemsComponent implements OnInit {

  listCommunalProblems: Array<CommunalProblem> = [];

  constructor(private communalProblemService : CommunalProblemService) { }

  public ngOnInit(): void {

    this.getAllCommunalProblems();

  }

  private getAllCommunalProblems(): void {
    this.communalProblemService.getAll().subscribe(res => {
      console.log(res)
      this.listCommunalProblems = res;
    })
  }

}
