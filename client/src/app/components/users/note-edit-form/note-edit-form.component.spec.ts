import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEditFormComponent } from './note-edit-form.component';

describe('NoteEditFormComponent', () => {
  let component: NoteEditFormComponent;
  let fixture: ComponentFixture<NoteEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
