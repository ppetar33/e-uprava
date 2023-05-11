import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/@api/services/auth.service';
import { JudgeService } from 'src/app/@api/services/judge.service';

@Component({
  selector: 'app-judge-communal-problems-hearing-dialog',
  templateUrl: './judge-communal-problems-hearing-dialog.component.html',
  styleUrls: ['./judge-communal-problems-hearing-dialog.component.scss']
})
export class JudgeCommunalProblemsHearingDialogComponent implements OnInit {
  public isLoading: boolean = false;
  public errorMessage: string = '';
  public hearingForm!: FormGroup;
  public user: any;
  public userId: string = '';
  public communalProblem: any;
  public date: any;

  constructor(
    public dialogRef: MatDialogRef<JudgeCommunalProblemsHearingDialogComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private judgeService: JudgeService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) { 
    this.hearingForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      date: ["", [Validators.required]],
    });
  }

  public ngOnInit(): void {
    this.userId = this.data.userId;
    this.communalProblem = this.data.communalProblem;
    if (!this.communalProblem.anonymous) {
      this.getUserById();
    }
  }

  public getUserById(): void {
    this.authService.getUserById(this.communalProblem.reportedById).subscribe((resp) => {
      this.user = resp;
      console.log(this.user)
      this.hearingForm = this.formBuilder.group({
        email: [this.user.email, [Validators.required, Validators.email]],
        name: [this.user.firstName, [Validators.required]],
        lastName: [this.user.lastName, [Validators.required]],
      });
    })
  }

  public getChoosenDate(event: any): void {
    this.date = this.formatDate(event.value);
  }

  public closeDialog(fetch: boolean): void {
    this.dialogRef.close(fetch);
  }

  public formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  public submit(): void {
    this.isLoading = true;
    
    const request = {
      "email": this.user.email,
      "date": this.date
    }

    this.judgeService.accept(this.communalProblem.id, request).subscribe({
      next: (resp) => {
        this.isLoading = false;
        this.dialogRef.close(fetch);
      },
      error: () => {
        this.errorMessage = 'Error accepting communal problem.';
        this.isLoading = false;
      }
    });
    this.errorMessage = '';
  }
}
