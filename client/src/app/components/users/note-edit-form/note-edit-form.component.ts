import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Note } from 'src/app/interfaces/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-edit-form',
  templateUrl: './note-edit-form.component.html',
  styleUrls: ['./note-edit-form.component.scss'],
})
export class NoteEditFormComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  errorMessage = null;
  noteData: Note;
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
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this._activatedRoute.snapshot.params;
    if (params.id) {
      this.subscription.add(
        this._noteService.getNote(params.id).subscribe(
          (res) => {
            this.noteData = res;
            this.previousData();
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
    const noteId = this.noteData?.id;

    this.subscription.add(
      this._noteService.editNote(noteId, formData).subscribe(
        () => {
          this.noteForm.reset();
          this._router.navigate([`/board/${this.noteData?.board.boardSlug}`]);
        },
        (err) => console.log(err)
      )
    );
  }

  getErrorMessage(field: string) {
    let message;

    if (this.noteForm.get(field).errors.required) {
      message = 'This field is required';
    }

    return message;
  }

  checkField(field: string): boolean {
    return (
      (this.noteForm.get(field).touched || this.noteForm.get(field).dirty) &&
      !this.noteForm.get(field).valid
    );
  }

  // get previous data
  private previousData(): void {
    this.noteForm.patchValue({
      title: this.noteData?.title,
      content: this.noteData?.content,
      colour: this.noteData?.colour,
    });
  }

  cancelSave() {
    this._router.navigate(['/board/web-developement']);
  }
}
