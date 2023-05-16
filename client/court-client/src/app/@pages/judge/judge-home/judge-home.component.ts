import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@api/services/auth.service';
import { JudgeService } from 'src/app/@api/services/judge.service';
import { TokenService } from 'src/app/@api/services/token.service';

@Component({
  selector: 'app-judge-home',
  templateUrl: './judge-home.component.html',
  styleUrls: ['./judge-home.component.scss']
})
export class JudgeHomeComponent implements OnInit {
  public isLoading: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns = ['title', 'description', 'address', 'dateHearing', 'solved', 'solve'];
  public dataSource!: MatTableDataSource<any>;
  public errorMessage: string = '';
  public isLoggedin: boolean = false;
  public user: any;

  constructor(
    private judgeService: JudgeService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private tokenService: TokenService
  ) { 
    localStorage.setItem('nav', JSON.stringify(0));
  }

  public ngOnInit(): void {
    this.isLoading = true;
    this.getLoggedinUser(this.tokenService.decodeToken(JSON.stringify(localStorage.getItem('token'))));
  }

  public getLoggedinUser(token: any): void {
    this.authService.getUserById(token.id).subscribe((resp) => {
      this.user = resp;
      this.getCommunalProblems();
    })
  }

  public getCommunalProblems(): void {
    this.judgeService.getJudgeCommunalProblems(this.user.id).subscribe({
      next: (response) => {
        let data: any = null;
        if (response.length > 2) {
          data = response?.filter((item: any) => item.hearing === true);
        }
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error with our server, please try again later.';
        this.isLoading = false;
      }
    });
    this.errorMessage = '';
  }

  public authenticated(): void {
    this.authService.authenticated().subscribe((resp) => {
      if (resp.token) {
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
    })
  }

  public applyFilter(filter: any) {
    let value = filter.value;
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  public solve(id: any, data: any): void {
    this.isLoading = true;
    this.judgeService.solve(id).subscribe({
      next: () => {
        this.solveOnCommunalPolice(data);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Error with solving this communal problem, please try again later.';
      }
    });
    this.errorMessage = '';
  }

  public solveOnCommunalPolice(data: any): void {
    this.judgeService.solveCommunalProblem(data).subscribe({
      next: () => {
        this.getCommunalProblems();
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Error with solving this communal problem, please try again later.'; 
      }
    })
    this.errorMessage = '';
  }
}
