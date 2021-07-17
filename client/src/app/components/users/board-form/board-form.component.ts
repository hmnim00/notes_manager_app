import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
})
export class BoardFormComponent implements OnInit {
  // model
  // model
  board: any = {
    id: '',
    title: '',
    description: '',
    colour: '',
  };

  colours = [
    { name: 'Blue', code: 'bg-primary text-white' },
    { name: 'Green', code: 'bg-success text-white' },
    { name: 'Yellow', code: 'bg-warning' },
    { name: 'Gray', code: 'bg-secondary' },
    { name: 'Red', code: 'bg-danger text-white' },
    { name: 'Dark', code: 'bg-dark text-white' },
  ];

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  cancelSave(): void {
    this._router.navigate(['/boards']);
  }
}
