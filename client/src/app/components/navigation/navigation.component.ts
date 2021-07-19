import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<any>();

  username = null;
  isAdmin = null;
  isSignedIn = false;

  constructor(public _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this._authService.isSignedIn.pipe(takeUntil(this._destroy)).subscribe(
      (res) => {
        this.isSignedIn = res;
        console.log('Is signed in: ', res);
      },
      (err) => console.error(err)
    );

    this._authService.usernameValue.pipe(takeUntil(this._destroy)).subscribe(
      (res) => {
        console.log('username: ', res);
        this.username = res;
      },
      (err) => console.error(err)
    );

    // check if user is admin
    this._authService.isAdmin.pipe(takeUntil(this._destroy)).subscribe(
      (res) => {
        console.log('Is admin => ', res);
        this.isAdmin = res;
      },
      (err) => console.error(err)
    );
  }

  ngOnDestroy(): void {
    this._destroy.next({});
    this._destroy.complete();
  }

  signout(): void {
    this._authService.signout();
  }
}
