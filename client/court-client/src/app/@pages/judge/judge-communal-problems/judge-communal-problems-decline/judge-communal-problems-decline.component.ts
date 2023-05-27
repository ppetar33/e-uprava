import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@api/services/auth.service';
import { JudgeService } from 'src/app/@api/services/judge.service';

@Component({
  selector: 'app-judge-communal-problems-decline',
  templateUrl: './judge-communal-problems-decline.component.html',
  styleUrls: ['./judge-communal-problems-decline.component.scss']
})
export class JudgeCommunalProblemsDeclineComponent implements OnInit {
  public isLoading: boolean = false;
  public errorMessage: string = '';
  public declineForm!: FormGroup;
  public user: any;
  public userId: string = '';
  public communalProblem: any;
  
  constructor(
    public dialogRef: MatDialogRef<JudgeCommunalProblemsDeclineComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private judgeService: JudgeService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.declineForm = this.formBuilder.group({
      text: ["", [Validators.required]]
    });
  }

  public ngOnInit(): void {
    this.userId = this.data.userId;
    this.communalProblem = this.data.communalProblem;
  }

  public closeDialog(fetch: boolean): void {
    this.dialogRef.close(fetch);
  }

  public submit(): void {
    this.isLoading = true;

    const request = {
      'text': this.declineForm.value.text
    }

    this.judgeService.decline(this.communalProblem.id, request).subscribe({
      next: (resp) => {
        this.improveCommunalProblem();
      },
      error: () => {
        this.errorMessage = 'Error declining communal problem.';
        this.isLoading = false;
      }
    });
    this.errorMessage = '';
  }

  public improveCommunalProblem(): void {
    this.communalProblem.improvement = this.declineForm.value.text;
    this.judgeService.improveCommunalProblem(this.communalProblem).subscribe(({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(fetch);
        this.router.navigate(['judge/problems']);
      },
      error: () => {
        this.errorMessage = 'Error declining communal problem.';
        this.isLoading = false;
      }
    }))
  }

  public deleteCommunalProblem(): void {
    this.judgeService.delete(this.communalProblem.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(fetch);
      },
      error: () => {
        this.errorMessage = 'Error deleting communal problem.';
        this.isLoading = false;
      }
    });
    this.errorMessage = '';
  }
}
