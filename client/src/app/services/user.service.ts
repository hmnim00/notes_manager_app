import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NewUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // api address
  URI = environment.API_URI;

  constructor(private _http: HttpClient) {}

  // update user
  editUser(id: number, data: NewUser): Observable<NewUser> {
    return this._http
      .put<NewUser>(`${this.URI}/users/edit/${id}`, data)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // delete user
  deleteUser(id: number): Observable<NewUser> {
    return this._http
      .delete<NewUser>(`${this.URI}/users/delete/${id}`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // ADMIN

  // error messages
  handlerError(err): Observable<never> {
    let message = 'Unknown error';
    if (err) {
      message = `${err.error.message}`;
    }
    return throwError(message);
  }
}
