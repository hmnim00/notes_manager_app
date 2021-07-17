import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  editNote(): void {
    this._router.navigate(['/edit-note/4']);
  }

  deleteNote(): void {
    console.log('Note deleted');
  }

  addNote(): void {
    this._router.navigate(['/new-note']);
  }
}
