import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/@api/services/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public userForm: FormGroup;
  public isLoading: boolean = false;
  public errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { 
    this.userForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      jmbg: ["", [Validators.required]],
      password: ["", [Validators.required]],
      passwordRepeated: ["", [Validators.required]],
    });
    this.userForm.addValidators(this.compareValidator(this.userForm.get('password'), this.userForm.get('passwordRepeated')));
  }

  public compareValidator(controlOne: any, controlTwo: any) {
    return () => {
      if (controlOne.value !== controlTwo.value) {
        return { match_error: 'Value does not match' };
      }
      return null;
    };
  }
  
  public ngOnInit(): void {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public openLogin(): void {
    this.closeDialog();
    const dialogRef = new MatDialogConfig();
    dialogRef.disableClose = true;
    dialogRef.autoFocus = false;
    this.dialog.open(LoginComponent, dialogRef);
  }

  public submitForm(): void {
  }
}
