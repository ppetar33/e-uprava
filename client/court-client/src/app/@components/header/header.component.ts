import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('back') back: string = '';

  constructor(
    private router: Router
  ) { }

  public ngOnInit(): void {
  }

  public goToHome(): void {
    this.router.navigate(['home']);
  }

  public goBack(): void {
    this.router.navigate([this.back]);
  }
}
