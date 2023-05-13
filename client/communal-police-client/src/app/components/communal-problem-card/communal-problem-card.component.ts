import { Component, OnInit, Input } from '@angular/core';
import { CommunalProblem } from 'src/app/model/communal-problem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-communal-problem-card',
  templateUrl: './communal-problem-card.component.html',
  styleUrls: ['./communal-problem-card.component.css']
})
export class CommunalProblemCardComponent implements OnInit {

  @Input() problem!: CommunalProblem;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onCardClicked(event: Event){
    this.router.navigate(['communal-problem/' + this.problem.id]);
  }

}
