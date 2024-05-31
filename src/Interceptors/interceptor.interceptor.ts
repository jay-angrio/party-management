import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  private catch = new Map<string, Subject<void>>();
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = JSON.parse(localStorage.getItem('token') as string);
    console.log('token', token);

    if (token) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Token ` + token,
        },
      });
      return next.handle(authReq);
    } else {
      return next.handle(request);
    }
  }
}
