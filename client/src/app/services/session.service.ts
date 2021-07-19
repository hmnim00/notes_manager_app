import { NewUser, Roles, User, UserResponse } from '../interfaces/user';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  // api address
  URI = environment.API_URI;

  private signedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Roles>(null);
  private userToken = new BehaviorSubject<string>(null);
  private userName = new BehaviorSubject<string>(null);

  constructor(private _http: HttpClient, private _router: Router) {
    this.checkToken();
  }

  // check if user is signed in
  get isSignedIn(): Observable<boolean> {
    return this.signedIn.asObservable();
  }

  // check if user is admin
  get isAdmin(): Observable<string> {
    return this.role.asObservable();
  }

  // get token
  get tokenValue(): string {
    return this.userToken.getValue();
  }

  // get username
  get usernameValue(): Observable<string> {
    return this.userName.asObservable();
  }

  // sign in user and get token from localeStorage
  signin(data: User): Observable<UserResponse | void> {
    return this._http.post<UserResponse>(`${this.URI}/users/signin`, data).pipe(
      map((user: UserResponse) => {
        this.saveToken(user);
        this.signedIn.next(true);
        this.role.next(user.role);
        this.userToken.next(user.token);
        this.userName.next(user.username);
        console.log('URI => ', this.URI);
        return user;
      }),
      // catchError((err) => throwError(err.error.message))
      catchError((err) => this.handlerError(err))
    );
  }

  // signup -> register new user
  signup(data: NewUser): Observable<UserResponse> {
    return this._http.post<UserResponse>(`${this.URI}/users/signup`, data).pipe(
      map((user: UserResponse) => {
        this.saveToken(user);
        this.signedIn.next(true);
        this.role.next(user.role);
        this.userToken.next(user.token);
        this.userName.next(user.username);

        return user;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  // delete the token from localStorage
  signout(): void {
    localStorage.removeItem('user'); // delete token
    this.signedIn.next(false); // set session active to false
    this.role.next(null); // removes role in variable
    this.userToken.next(null); // removes token in variable
    this.userName.next(null);
    this._router.navigate(['/signin']); // redirect to admin signin page
  }

  // check token
  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) this.signout();
      else {
        this.signedIn.next(true);
        this.role.next(user.role);
        this.userName.next(user.username);
        this.userToken.next(user.token);
      }
    }
  }

  // save token to localStorage
  saveToken(user: UserResponse): void {
    const { userId, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  // handle error
  handlerError(err): Observable<never> {
    let message = 'Unknown error';
    if (err) {
      // message = `${err.error.message}`;
      message = `${err.error?.message}`;
    }
    // window.alert(message);
    console.log(message);
    return throwError(message);
  }
}
