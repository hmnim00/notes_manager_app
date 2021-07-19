import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Board } from 'src/app/interfaces/board';
import { AdminService } from 'src/app/services/admin.service';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-admin-boards',
  templateUrl: './admin-boards.component.html',
  styleUrls: ['./admin-boards.component.scss'],
})
export class AdminBoardsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  boards: Board[] = [];

  constructor(
    private _router: Router,
    private _boardService: BoardService,
    private _adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getBoards();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getBoards(): void {
    this.subscription.add(
      this._boardService.getBoards().subscribe(
        (res) => (this.boards = res),
        (err) => console.log(err)
      )
    );
  }

  visitDashboard(): void {
    this._router.navigate(['/admin/dashboard']);
  }

  deleteBoard(id: number): void {
    if (id === 1) return;

    this.subscription.add(
      this._adminService.deleteBoard(id).subscribe(() => {
        // console.log('Board deleted');
        this.ngOnInit();
      })
    );
  }

  visitUsers(): void {
    this._router.navigate(['/admin/users']);
  }

  visitNotes(): void {
    this._router.navigate(['/admin/notes']);
  }
}
