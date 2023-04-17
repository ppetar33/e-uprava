import { Component, Input, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast-bar',
  templateUrl: './toast-bar.component.html',
  styleUrls: ['./toast-bar.component.scss']
})
export class ToastBarComponent implements OnInit {
  @Input('message') message: string = '';
  @Input('status') status: string = '';
  @Input('duration') duration: number = 2;

  constructor(private _snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    if (this.status === 'success') {
      this.openSuccessSnackBar();
    } else if (this.status === 'failure') {
      this.openFailureSnackBar();
    } else {
      this.openSnackBar();
    }
  }

  public openSnackBar(): void {
    this._snackBar.open(this.message, '', {
      duration: this.duration * 1000,
      panelClass: ['blue-snackbar']
    });
  }

  public openSuccessSnackBar(): void {
    this._snackBar.open(this.message, '', {
      duration: this.duration * 1000,
      panelClass: ['green-snackbar']
    });
  }

  public openFailureSnackBar(): void {
    this._snackBar.open(this.message, '', {
      duration: this.duration * 1000,
      panelClass: ['red-snackbar']
    });
  }
}
