import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(readonly snackbar: MatSnackBar) { }

  open(message: string, action = '', config?: MatSnackBarConfig) {
    return this.snackbar.open(message, action, {
      duration: 3500
    })
  }
}
