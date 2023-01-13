import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthResponse } from './auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  @ViewChild('loginForm') loginForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const user = { ...this.loginForm.value, returnSecureToken: true };
    this.isLoading = true;
    let authObservable: Observable<AuthResponse>;
    if (this.isLoginMode) {
      authObservable = this.authService.signInUser(user);
    } else {
      authObservable = this.authService.signUpUser(user);
    }
    authObservable.subscribe(
      (response) => {
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes']);
      },
      (error) => {
        if (!error.error.error || !error.error.error.message) {
          this.error = 'Request failed: unknown error';
        } else {
          this.error = `Request failed: ${error.error.error.message
            .replaceAll('_', ' ')
            .toLowerCase()}`;
        }

        this.isLoading = false;
      }
    );
    this.loginForm.reset();
  }
}
