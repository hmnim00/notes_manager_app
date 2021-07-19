import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Board } from 'src/app/interfaces/board';
import { Note } from 'src/app/interfaces/note';
import { UserForAdmin } from 'src/app/interfaces/user';
import { AdminService } from 'src/app/services/admin.service';
import { BoardService } from 'src/app/services/board.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  boards: Board[] = [];
  notes: Note[] = [];
  users: UserForAdmin[] = [];

  constructor(
    private _router: Router,
    private _boardService: BoardService,
    private _noteService: NoteService,
    private _adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getBoards();
    this.getNotes();
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getBoards(): void {
    this.subscription.add(
      this._boardService.getBoards().subscribe(
        (res) => {
          // console.log('Boards: ', res);
          this.boards = res;
        },
        (err) => console.log(err)
      )
    );
  }

  getNotes(): void {
    this.subscription.add(
      this._noteService.getNotes().subscribe((res) => {
        // console.log('Notes', res);
        this.notes = res;
      })
    );
  }

  getUsers(): void {
    this.subscription.add(
      this._adminService.getUsers().subscribe(
        (res) => (this.users = res),
        (err) => console.log(err)
      )
    );
  }

  visitUsers(): void {
    this._router.navigate(['/admin/users']);
  }

  visitBoards(): void {
    this._router.navigate(['/admin/boards']);
  }

  visitNotes(): void {
    this._router.navigate(['/admin/notes']);
  }
}
