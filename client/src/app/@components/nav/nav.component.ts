import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public itemsList: Array<string> = ['HOME', 'LOGIN'];
  public activeIndex: number = 0;

  constructor(
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.activeIndex = Number(JSON.parse(localStorage.getItem('nav') || ''));
  }

  public goToPage(page: string, index: number): void {
    this.activeIndex = index;
    localStorage.setItem('nav', JSON.stringify(this.activeIndex));
    this.router.navigate([page.toLowerCase()]);
  }
}
