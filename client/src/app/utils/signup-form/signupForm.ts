import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SignupForm {
  // validators
  private isVaildEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private _formBuilder: FormBuilder) {}

  // form model
  signupForm = this._formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.pattern(this.isVaildEmail)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  // validate fields
  validField(field: string): boolean {
    this.getErrorMessage(field);

    return (
      (this.signupForm.get(field).touched ||
        this.signupForm.get(field).dirty) &&
      !this.signupForm.get(field).valid
    );
  }

  // error messages
  private getErrorMessage(field: string) {
    const { errors } = this.signupForm.get(field);

    if (errors) {
      const minlength = errors?.minlength?.requiredLength;
      const messages = {
        required: 'This field is required',
        pattern: 'Not a valid email',
        minlength: `This field must be longer than ${minlength} characters`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
