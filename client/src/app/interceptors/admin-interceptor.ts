import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (
      req.url.includes('edit') ||
      req.url.includes('admin') ||
      req.url.includes('new') ||
      req.url.includes('delete') ||
      req.url.includes('board') ||
      req.url.includes('note') ||
      req.url.includes('profile') ||
      req.url.includes('user')
    ) {
      const authToken = this._authService.tokenValue;

      const authReq = req.clone({
        setHeaders: {
          auth: authToken,
        },
      });
      return next.handle(authReq);
    } else if (req.url.includes('signin') || req.url.includes('signup')) {
      return next.handle(req);
    }
  }
}
