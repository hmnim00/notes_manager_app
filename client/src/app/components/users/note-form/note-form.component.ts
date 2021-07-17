import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit {
  // model
  note: any = {
    id: '',
    title: '',
    content: '',
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

  cancelSave() {
    this._router.navigate(['/board/web-developement']);
  }
}
