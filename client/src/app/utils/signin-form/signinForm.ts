import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SigninForm {
  errorMessage = null;

  constructor(private _formBuilder: FormBuilder) {}

  // form model
  signinForm = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  // validate fields
  validField(field: string): boolean {
    this.getErrorMessage(field);

    return (
      (this.signinForm.get(field).touched ||
        this.signinForm.get(field).dirty) &&
      !this.signinForm.get(field).valid
    );
  }

  // error messages
  private getErrorMessage(field: string) {
    const { errors } = this.signinForm.get(field);

    if (errors) {
      const messages = {
        required: 'This field is required',
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
