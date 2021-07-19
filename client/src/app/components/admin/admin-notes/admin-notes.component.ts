import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/interfaces/note';
import { AdminService } from 'src/app/services/admin.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-admin-notes',
  templateUrl: './admin-notes.component.html',
  styleUrls: ['./admin-notes.component.scss'],
})
export class AdminNotesComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  notes: Note[] = [];

  constructor(
    private _router: Router,
    private _noteService: NoteService,
    private _adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.subscription.add(
      this._noteService.getNotes().subscribe(
        (res) => {
          // console.log('Notes: ', res);
          this.notes = res;
        },
        (err) => console.log(err)
      )
    );
  }

  visitDashboard(): void {
    this._router.navigate(['/admin/dashboard']);
  }

  deleteNote(id: number): void {
    this.subscription.add(
      this._adminService.deleteNote(id).subscribe((res) => {
        console.log('Note deleted');
        this.ngOnInit();
      })
    );
    console.log('Deleting note: ', id);
  }

  visitUsers(): void {
    this._router.navigate(['/admin/users']);
  }

  visitBoards(): void {
    this._router.navigate(['/admin/boards']);
  }
}
