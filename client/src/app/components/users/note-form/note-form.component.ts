import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Board } from 'src/app/interfaces/board';
import { Note } from 'src/app/interfaces/note';
import { BoardService } from 'src/app/services/board.service';
import { NoteService } from 'src/app/services/note.service';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  errorMessage = null;
  noteData: Note;
  board: Board;
  cardTitle = 'New note';

  colours: any[] = [
    { name: 'Blue', code: 'bg-primary text-white' },
    { name: 'Green', code: 'bg-success text-white' },
    { name: 'Yellow', code: 'bg-warning' },
    { name: 'Gray', code: 'bg-secondary text-white' },
    { name: 'Red', code: 'bg-danger text-white' },
    { name: 'Dark', code: 'bg-dark text-white' },
  ];

  noteForm = this._formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    colour: ['', Validators.required],
  });

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _noteService: NoteService,
    private _boardService: BoardService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this._activatedRoute.snapshot.params;

    if (params.id) {
      this.subscription.add(
        this._boardService.getBoardId(params.id).subscribe(
          (res) => {
            this.board = res;
            console.log(this.board);
            this.cardTitle = 'Note Update';
          },
          (err) => console.log(err)
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveNote(): void {
    const formData = this.noteForm.value;

    this.subscription.add(
      this._noteService.createNote(this.board?.id, formData).subscribe(
        (res) => {
          this.noteForm.reset();
          this._router.navigate([`/board/${this.board?.boardSlug}`]);
          // console.log('Navigate to board');
        },
        (err) => console.log(err)
      )
    );
  }

  getErrorMessage(field: string) {
    let message;

    if (this.noteForm.get(field).errors.required) {
      message = 'This field is required';
    } else if (this.noteForm.get(field).hasError('pattern')) {
      message = 'Insert valid characters only';
    }

    return message;
  }

  checkField(field: string): boolean {
    return (
      (this.noteForm.get(field).touched || this.noteForm.get(field).dirty) &&
      !this.noteForm.get(field).valid
    );
  }

  cancelSave() {
    this._router.navigate(['/board/web-developement']);
  }
}
