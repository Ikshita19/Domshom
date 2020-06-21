import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  // private snackbarSubject = new Subject<any>();
  // public snackbarState = this.snackbarSubject.asObservable();


  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // constructor() { }
  constructor(private _snackBar: MatSnackBar) { }


  show(message: string, duration?: number, horizontalPosition?: MatSnackBarHorizontalPosition,  verticalPosition?: MatSnackBarVerticalPosition) {

    setTimeout(() => {
      this._snackBar.open(message, 'End now', {
        duration: duration || 5000,
        horizontalPosition: horizontalPosition || this.horizontalPosition,
        verticalPosition: verticalPosition || this.verticalPosition,
      });
    },0);    
    // this.snackbarSubject.next({
    //   // show: true,
    //   message,
    //   // type
    // });
  }

}
