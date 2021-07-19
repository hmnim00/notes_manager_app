import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SignupForm } from 'src/app/utils/signup-form/signupForm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  errorMessage = null;

  private subscription: Subscription = new Subscription();

  constructor(
    private _authService: AuthService,
    private _router: Router,
    public _form: SignupForm
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  signup(): void {
    // validate fields
    if (this._form.signupForm.invalid) return;

    const data = this._form.signupForm.value;
    this.subscription.add(
      this._authService.signup(data).subscribe(
        (res) => {
          // console.log('Res -> ', res);
          res && this._router.navigate(['/profile']);
        },
        (err) => {
          console.error('Register error: ', err);
          this.errorMessage = err;
        }
      )
    );
    this._form.signupForm.reset();
    this._form.signupForm.markAsPristine();
    this._form.signupForm.markAsUntouched();
  }

  checkField(field: string): boolean {
    return this._form.validField(field);
  }
}
