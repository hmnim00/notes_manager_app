import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-boards',
  templateUrl: './admin-boards.component.html',
  styleUrls: ['./admin-boards.component.scss'],
})
export class AdminBoardsComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  visitDashboard(): void {
    this._router.navigate(['/admin/dashboard']);
  }
  deleteBoard(): void {
    console.log('Deleting board');
  }
}
