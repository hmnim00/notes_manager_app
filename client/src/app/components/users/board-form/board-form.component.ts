import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Board } from 'src/app/interfaces/board';
import { BoardService } from 'src/app/services/board.service';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
})
export class BoardFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  errorMessage = null;
  action = Action.NEW;
  boardData: Board;
  cardTitle = 'New Board';

  colours: any[] = [
    { name: 'Blue', code: 'bg-primary text-white' },
    { name: 'Green', code: 'bg-success text-white' },
    { name: 'Yellow', code: 'bg-warning' },
    { name: 'Gray', code: 'bg-secondary text-white' },
    { name: 'Red', code: 'bg-danger text-white' },
    { name: 'Dark', code: 'bg-dark text-white' },
  ];

  boardForm = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    colour: [this.colours, [Validators.required]],
  });

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _boardService: BoardService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this._activatedRoute.snapshot.params;
    if (params.id) {
      this.subscription.add(
        this._boardService.getBoardId(params.id).subscribe(
          (res) => {
            console.log('Edit board');
            this.boardData = res;
            this.action = Action.EDIT;
            this.previousData();
            this.cardTitle = 'Board Update';
          },
          (err) => console.log(err)
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveBoard(): void {
    const formData = this.boardForm.value;
    // console.log(formData);
    // new board
    if (this.action === Action.NEW) {
      this.subscription.add(
        this._boardService.createBoard(formData).subscribe(
          (res) => {
            this.boardForm.reset();
            this._router.navigate(['/boards']);
          },
          (err) => {
            // console.log(err);
            this.errorMessage = err;
          }
        )
      );
    } else {
      const boardId = this.boardData?.id;

      this.subscription.add(
        this._boardService.editBoard(boardId, formData).subscribe(
          () => {
            this.boardForm.reset();
            this._router.navigate(['/boards']);
          },
          (err) => console.log(err)
        )
      );
    }
  }

  getErrorMessage(field: string) {
    let message;

    if (this.boardForm.get(field).errors.required) {
      message = 'This field is required';
    } else if (this.boardForm.get(field).hasError('pattern')) {
      message = 'Insert valid characters, please';
    }

    return message;
  }

  checkField(field: string): boolean {
    return (
      (this.boardForm.get(field).touched || this.boardForm.get(field).dirty) &&
      !this.boardForm.get(field).valid
    );
  }

  // get data
  private previousData(): void {
    this.boardForm.patchValue({
      title: this.boardData?.title,
      description: this.boardData?.description,
      colour: this.boardData?.colour,
    });
  }

  cancelSave(): void {
    this._router.navigate(['/boards']);
  }
}
