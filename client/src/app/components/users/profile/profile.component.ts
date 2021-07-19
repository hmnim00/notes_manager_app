import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Board } from 'src/app/interfaces/board';
import { Note } from 'src/app/interfaces/note';
import { AuthService } from 'src/app/services/auth.service';
import { BoardService } from 'src/app/services/board.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private _destroy = new Subject<any>();

  username = null;
  boards: Board[] = [];
  notes: Note[] = [];

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _noteService: NoteService,
    private _boardService: BoardService
  ) {}

  ngOnInit(): void {
    this._authService.usernameValue
      .pipe(takeUntil(this._destroy))
      .subscribe((res) => (this.username = res));

    this.getBoards();
  }

  showBoard(): void {
    this._router.navigate(['/board/web-developement']);
  }

  editBoard(): void {
    this._router.navigate(['/edit-board/1']);
  }

  deleteBoard(): void {
    console.log('Board deleted');
  }

  editNote(): void {
    this._router.navigate(['/edit-note/4']);
  }

  deleteNote(): void {
    console.log('Note deleted');
  }

  // get boards
  getBoards(): void {
    this._boardService
      .getMyBoards()
      .pipe(takeUntil(this._destroy))
      .subscribe((res) => (this.boards = res));
  }

  // get notes
  getNotes(): void {
    this._noteService
      .getMyNotes()
      .pipe(takeUntil(this._destroy))
      .subscribe((res) => (this.notes = res));
  }
}
