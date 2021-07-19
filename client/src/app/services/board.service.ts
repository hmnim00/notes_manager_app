import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Board } from '../interfaces/board';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  // api address
  URI = environment.API_URI;

  constructor(private _http: HttpClient) {}

  // show boards
  getBoards(): Observable<Board[]> {
    return this._http
      .get<Board[]>(`${this.URI}/boards/all`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // show board detail
  getBoard(slug: string): Observable<Board> {
    return this._http
      .get<Board>(`${this.URI}/boards/detail/${slug}`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // get board
  getBoardId(id: number): Observable<Board> {
    return this._http
      .get<Board>(`${this.URI}/boards/code/${id}`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // add new board
  createBoard(data: Board): Observable<Board> {
    return this._http
      .post<Board>(`${this.URI}/boards/create`, data)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // update board
  editBoard(id: number, data: Board): Observable<Board> {
    return this._http
      .put<Board>(`${this.URI}/boards/edit/${id}`, data)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // delete board
  deleteBoard(id: number): Observable<Board> {
    return this._http
      .delete<Board>(`${this.URI}/boards/delete/${id}`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // get boards by user
  getMyBoards(): Observable<Board[]> {
    return this._http
      .get<Board[]>(`${this.URI}/boards/my-boards`)
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
