import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (
      req.url.includes('board') ||
      req.url.includes('note') ||
      req.url.includes('admin') ||
      req.url.includes('new') ||
      req.url.includes('edit')
    ) {
      const authToken = this._authService.tokenValue;

      // debugger;

      const authRequest = req.clone({
        setHeaders: {
          auth: authToken,
        },
      });
      return next.handle(authRequest);
    }

    return next.handle(req);
  }
}
