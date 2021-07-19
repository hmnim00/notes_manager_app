import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  // api address
  URI = environment.API_URI;

  constructor(private _http: HttpClient) {}

  // show notes
  getNotes(): Observable<Note[]> {
    return this._http
      .get<Note[]>(`${this.URI}/notes`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // show note detail
  getNote(id: number): Observable<Note> {
    return this._http
      .get<Note>(`${this.URI}/notes/${id}`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // add new note
  createNote(id: number, data: Note): Observable<Note> {
    return this._http
      .post<Note>(`${this.URI}/notes/create/${id}`, data)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // update note
  editNote(id: number, data: Note): Observable<Note> {
    return this._http
      .put<Note>(`${this.URI}/notes/edit/${id}`, data)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // delete note
  deleteNote(id: number): Observable<Note> {
    return this._http
      .delete<Note>(`${this.URI}/notes/delete/${id}`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // get notes by user
  getMyNotes(): Observable<Note[]> {
    return this._http
      .get<Note[]>(`${this.URI}/notes/my-notes`)
      .pipe(catchError((err) => this.handlerError(err)));
  }

  // get board notes
  getBoardNotes(id: number): Observable<Note[]> {
    return this._http
      .get<Note[]>(`${this.URI}/notes/board-notes/${id}`)
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
