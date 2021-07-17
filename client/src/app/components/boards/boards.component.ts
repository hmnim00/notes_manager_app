import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  showBoard(): void {
    this._router.navigate(['/board/web-developement']);
  }

  editBoard(): void {
    this._router.navigate(['/edit-board/1']);
  }

  deleteBoard(): void {
    console.log('Board deleted');
  }
}
