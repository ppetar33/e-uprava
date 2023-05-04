import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService as AuthenticationService} from 'src/app/@api/services/auth.service';
import { JudgeService } from 'src/app/@api/services/judge.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-judge-communal-problems',
  templateUrl: './judge-communal-problems.component.html',
  styleUrls: ['./judge-communal-problems.component.scss']
})
export class JudgeCommunalProblemsComponent implements OnInit {
  public isLoading: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns = ['title', 'description', 'address'];
  public dataSource!: MatTableDataSource<any>;
  public errorMessage: string = '';

  constructor(
    private judgeService: JudgeService,
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    public auth: AuthService,
  ) { 
    localStorage.setItem('nav', JSON.stringify(1));
  }

  public ngOnInit(): void {
    this.isLoading = true;
    this.getCommunalProblems();
  }

  public getCommunalProblems(): void {
    this.judgeService.getJudgeCommunalProblems('7a5745f4-6320-4d2f-af20-2d768208ccc6').subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error with our server, please try again later.';
        this.isLoading = false;
      }
    })
  }

  public applyFilter(filter: any) {
    let value = filter.value;
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }
}
