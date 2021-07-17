import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  // model
  user: any = {
    id: '',
    username: '',
    email: '',
    role: '',
  };

  roles: any = [{ name: 'admin' }, { name: 'moderator' }, { name: 'user' }];

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  cancelUpdate(): void {
    this._router.navigate(['/admin/users']);
  }
}
