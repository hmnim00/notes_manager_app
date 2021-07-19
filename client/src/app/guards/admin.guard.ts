import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._authService.isAdmin.pipe(
      map((res) => {
        console.log('User admin: ', res);
        if (res === 'admin') {
          return true;
        } else {
          this._router.navigate(['/boards']);
        }

        return true;
      })
    );
  }
}
