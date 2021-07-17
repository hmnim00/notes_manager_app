import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

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
