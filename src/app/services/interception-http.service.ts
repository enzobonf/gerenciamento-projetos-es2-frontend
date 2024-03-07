import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptionHttpService implements HttpInterceptor {
  constructor(private appService: AppService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token_auth: string = this.appService.getAuthToken();

    console.log('[interception-http]', `[${request.method}]`, request.url);

    if (token_auth && token_auth.length > 10) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token_auth),
      });
    }

    console.log(request.headers);

    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({
    //     headers: request.headers.set('Content-Type', 'application/json'),
    //   });
    // }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/login']);
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
