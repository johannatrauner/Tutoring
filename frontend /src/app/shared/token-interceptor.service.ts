import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() {}

  /**
   * Intercepts HTTP requests and adds the Authorization header with the token from sessionStorage.
   * @param req The outgoing HTTP request.
   * @param next The next handler in the chain.
   * @returns An Observable of the HTTP event stream.
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
    return next.handle(req);
  }
}
