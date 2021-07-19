import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Board } from 'src/app/interfaces/board';
import { AuthService } from 'src/app/services/auth.service';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-all-boards',
  templateUrl: './all-boards.component.html',
  styleUrls: ['./all-boards.component.scss'],
})
export class AllBoardsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private _destroy = new Subject<any>();

  boards: Board[] = [];
  username = null;

  constructor(
    private _router: Router,
    private _boardService: BoardService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getBoards();

    this._authService.usernameValue.pipe(takeUntil(this._destroy)).subscribe(
      (res) => (this.username = res),
      (err) => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showBoard(slug: string): void {
    this._router.navigate([`/board/${slug}`]);
  }

  editBoard(id: number): void {
    this._router.navigate([`/edit-board/${id}`]);
    // this._router.navigate(['/edit-board/1']);
  }

  deleteBoard(id: number): void {
    // console.log('Board deleted id: ', id);
    this.subscription.add(
      this._boardService.deleteBoard(id).subscribe(
        () => this.ngOnInit(),
        (err) => console.log(err)
      )
    );
  }

  getBoards(): void {
    this.subscription.add(
      this._boardService.getBoards().subscribe(
        (res) => (this.boards = res),
        (err) => console.log(err)
      )
    );
  }

  createBoard(): void {
    this._router.navigate(['/new-board']);
  }
}
