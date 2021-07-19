import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Board } from 'src/app/interfaces/board';
import { Note } from 'src/app/interfaces/note';
import { AuthService } from 'src/app/services/auth.service';
import { BoardService } from 'src/app/services/board.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  private _destroy = new Subject<any>();

  slug: string;
  board: Board;
  notes: Note[];
  username = null;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _boardService: BoardService,
    private _noteService: NoteService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getBoard();

    this._authService.usernameValue.pipe(takeUntil(this._destroy)).subscribe(
      (res) => (this.username = res),
      (err) => console.log(err)
    );
  }

  editNote(id: number): void {
    // console.log('Edit note: ', id);
    this._router.navigate([`/edit-note/${id}`]);
  }

  deleteNote(id: number): void {
    this.subscription.add(
      this._noteService.deleteNote(id).subscribe(
        () => this.ngOnInit(),
        (err) => console.log(err)
      )
    );
  }

  addNote(id: number): void {
    // console.log('Add new note to board id: ', id);
    this._router.navigate([`/new-note/${id}`]);
  }

  getBoard(): void {
    this.subscription.add(
      this._activatedRoute.params.subscribe((params) => {
        this.slug = params['slug'];
        this._boardService.getBoard(this.slug).subscribe(
          (res) => {
            // console.log(res);
            this.board = res;
            this.getNotes(res.id);
          },
          (err) => console.log(err)
        );
      })
    );
  }

  getNotes(id: number): void {
    this.subscription.add(
      this._activatedRoute.params.subscribe((params) => {
        this._noteService.getBoardNotes(id).subscribe(
          (res) => {
            // console.log(res);
            this.notes = res;
          },
          (err) => console.log(err)
        );
      })
    );
  }
}
