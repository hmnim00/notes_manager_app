import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SigninForm } from 'src/app/utils/signin-form/signinForm';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  errorMessage = null;

  private subscription: Subscription = new Subscription();

  constructor(
    private _authService: AuthService,
    private _router: Router,
    public _form: SigninForm
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  signin() {
    // validate fields
    if (this._form.signinForm.invalid) return;

    const data = this._form.signinForm.value;

    this.subscription.add(
      this._authService.signin(data).subscribe(
        (res) => {
          console.log('Res -> ', res);
          if (res) this._router.navigate(['/boards']);
        },
        (err) => {
          console.error('Login error: ', err);
          this.errorMessage = err;
        }
      )
    );
    this._form.signinForm.reset();
    this._form.signinForm.markAsPristine();
    this._form.signinForm.markAsUntouched();
  }

  checkField(field: string): boolean {
    return this._form.validField(field);
  }
}
