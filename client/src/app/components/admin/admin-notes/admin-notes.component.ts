import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-notes',
  templateUrl: './admin-notes.component.html',
  styleUrls: ['./admin-notes.component.scss'],
})
export class AdminNotesComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  visitDashboard(): void {
    this._router.navigate(['/admin/dashboard']);
  }

  deleteNote(): void {
    console.log('Deleting note');
  }
}
