import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationComponent } from './dialog-animation/dialog-animation.component';
import { Observable } from 'rxjs';

@Injectable()
export class ConfirmInterceptor implements HttpInterceptor {
  
  constructor(public dialog: MatDialog) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      data: { dialogContent: '¿Está seguro de que desea realizar esta acción?' }
    });

    return new Observable(observer => {
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          observer.next(request.body);
        } else {
          observer.complete();
        }
      });
    });
  }
};
