import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  visitDashboard(): void {
    this._router.navigate(['/admin/dashboard']);
  }

  editUser(): void {
    this._router.navigate(['/admin/edit-user/1']);
  }

  deleteUser(): void {
    console.log('Deleting user');
  }
}
