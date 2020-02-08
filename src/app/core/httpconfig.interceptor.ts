import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(public afAuth: AngularFireAuth) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.afAuth.auth.currentUser !== null) {
      return this.getToken().pipe(switchMap(token => {
        if (token !== null) {
          const authToken = 'Bearer ' + token;
          request = request.clone({ headers: request.headers.set('Authorization', authToken) });
        }
        return this.handle(request, next);
      }));
    } else {
      return this.handle(request, next);
    }

  }

  private handle(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error.reason ? error.error.reason : '',
          status: error.status
        };
        return throwError(error);
      }));
  }

  private getToken(): Observable<string> {
    return from(this.afAuth.auth.currentUser.getIdToken(true));
  }
}
