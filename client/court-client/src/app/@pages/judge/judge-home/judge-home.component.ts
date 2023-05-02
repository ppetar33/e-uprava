import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-judge-home',
  templateUrl: './judge-home.component.html',
  styleUrls: ['./judge-home.component.scss']
})
export class JudgeHomeComponent implements OnInit {

  constructor() { 
    localStorage.setItem('nav', JSON.stringify(0));
  }

  public ngOnInit(): void {
  }

}
