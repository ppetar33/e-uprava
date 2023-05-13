import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/@api/services/auth.service';
import { JudgeService } from 'src/app/@api/services/judge.service';
import { TokenService } from 'src/app/@api/services/token.service';
import { JudgeCommunalProblemsHearingDialogComponent } from '../judge-communal-problems-hearing-dialog/judge-communal-problems-hearing-dialog.component';
import { JudgeCommunalProblemsDeclineComponent } from '../judge-communal-problems-decline/judge-communal-problems-decline.component';

@Component({
  selector: 'app-judge-communal-problems-details',
  templateUrl: './judge-communal-problems-details.component.html',
  styleUrls: ['./judge-communal-problems-details.component.scss']
})
export class JudgeCommunalProblemsDetailsComponent implements OnInit {
  public errorMessage: string = '';
  public id: string = '';
  public communalProblem: any;
  public isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private judgeService: JudgeService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.isLoading = true;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getCommunalProblem();
  }

  public getCommunalProblem(): void {
    this.judgeService.getCommunalProblmeById(this.id).subscribe((resp) => {
      this.communalProblem = resp;
      this.isLoading = false;
      console.log(this.communalProblem);
    });
  }

  public accept(): void {
    const dialogRef = new MatDialogConfig();
    dialogRef.disableClose = true;
    dialogRef.autoFocus = false;
    dialogRef.data = {
      userId: this.communalProblem.reportedById,
      communalProblem: this.communalProblem
    }
    this.dialog.open(JudgeCommunalProblemsHearingDialogComponent, dialogRef).afterClosed().subscribe((data) => {
      if(data) {
        this.isLoading = true;
        this.getCommunalProblem();
      }
    });
  }

  public decline(): void {
    const dialogRef = new MatDialogConfig();
    dialogRef.disableClose = true;
    dialogRef.autoFocus = false;
    dialogRef.data = {
      userId: this.communalProblem.reportedById,
      communalProblem: this.communalProblem
    }
    this.dialog.open(JudgeCommunalProblemsDeclineComponent, dialogRef).afterClosed().subscribe((data) => {
      if(data) {
        this.isLoading = true;
        this.getCommunalProblem();
      }
    });
  }
}
