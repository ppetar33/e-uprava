import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-judge-communal-problems',
  templateUrl: './judge-communal-problems.component.html',
  styleUrls: ['./judge-communal-problems.component.scss']
})
export class JudgeCommunalProblemsComponent implements OnInit {

  constructor() { 
    localStorage.setItem('nav', JSON.stringify(1));

  }

  public ngOnInit(): void {
  }

}
