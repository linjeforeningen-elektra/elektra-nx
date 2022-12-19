import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class WebSnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  private ref?: MatSnackBarRef<unknown>;

  open(msg: string) {
    this.ref?.dismiss();

    this.ref = this.snackbar.open(msg, 'OK', { duration: 1000, panelClass: 'snackbar' });
  }
}
