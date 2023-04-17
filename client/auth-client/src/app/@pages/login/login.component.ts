import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@api/services/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public emailExists: boolean = false;
  public errorMessage: string = '';
  public isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.loginForm = this.formBuilder.group({
      jmbg: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  public ngOnInit(): void {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public submit(): void {

  }

  public openRegistration(): void {
    this.closeDialog();
    const dialogRef = new MatDialogConfig();
    dialogRef.disableClose = true;
    this.dialog.open(RegisterComponent, dialogRef); 
  }
}
