import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Board } from '../interfaces/board';
import { Note } from '../interfaces/note';
import { UserForAdmin } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // api address
  URI = environment.API_URI;

  constructor(private _http: HttpClient) {}

  // get users
  getUsers(): Observable<UserForAdmin[]> {
    return this._http
      .get<UserForAdmin[]>(`${this.URI}/admin/users`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // get user
  getUser(id: number): Observable<UserForAdmin> {
    return this._http
      .get<UserForAdmin>(`${this.URI}/admin/users/${id}`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // edit user
  editUser(id: number, data: UserForAdmin): Observable<UserForAdmin> {
    return this._http
      .put<UserForAdmin>(`${this.URI}/admin/users/edit/${id}`, data)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // delete user
  deleteUser(id: number): Observable<UserForAdmin> {
    return this._http
      .delete<UserForAdmin>(`${this.URI}/admin/users/delete/${id}`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // delete board
  deleteBoard(id: number): Observable<Board> {
    return this._http
      .delete<Board>(`${this.URI}/admin/boards/delete/${id}`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // delete note
  deleteNote(id: number): Observable<Note> {
    return this._http
      .delete<Note>(`${this.URI}/admin/notes/delete/${id}`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // error messages
  handlerError(err): Observable<never> {
    let message = 'Unknown error';
    if (err) {
      message = `${err.error.message}`;
    }
    return throwError(message);
  }
}
