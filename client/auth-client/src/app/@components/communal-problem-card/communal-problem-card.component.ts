import { Component, Input, OnInit } from '@angular/core';
import { CommunalProblem } from 'src/app/@api/model/communal-problem.model';
import { CommunalProblemService } from 'src/app/@api/services/communal-problem.service';

@Component({
  selector: 'app-communal-problem-card',
  templateUrl: './communal-problem-card.component.html',
  styleUrls: ['./communal-problem-card.component.scss']
})
export class CommunalProblemCardComponent implements OnInit {

  @Input() problem!: CommunalProblem;

  constructor() { }

  ngOnInit(): void {

  }
}
