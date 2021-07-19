import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserForAdmin } from 'src/app/interfaces/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  users: UserForAdmin[] = [];

  constructor(private _router: Router, private _adminService: AdminService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  visitDashboard(): void {
    this._router.navigate(['/admin/dashboard']);
  }

  editUser(): void {
    this._router.navigate(['/admin/edit-user/1']);
  }

  deleteUser(id: number): void {
    if (id === 1) return;

    this.subscription.add(
      this._adminService.deleteUser(id).subscribe(() => {
        console.log('User deleted');
        this.ngOnInit();
      })
    );
  }

  getUsers(): void {
    this.subscription.add(
      this._adminService.getUsers().subscribe(
        (res) => {
          this.users = res;
        },
        (err) => console.log(err)
      )
    );
  }

  visitBoards(): void {
    this._router.navigate(['/admin/boards']);
  }

  visitNotes(): void {
    this._router.navigate(['/admin/notes']);
  }
}
