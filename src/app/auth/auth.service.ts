import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthResponse, AuthData } from './auth.model';
import { User } from './user.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenexpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUpUser(user: AuthData) {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        user
      )
      .pipe(
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  signInUser(user: AuthData) {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        user
      )
      .pipe(
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: string
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('USER_DATA', JSON.stringify(user));
    this.autoLogout(+expiresIn * 1000);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('USER_DATA'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const tokenExpirationDate =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(tokenExpirationDate);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenexpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('USER_DATA');
    this.router.navigate(['/auth']);
    if (this.tokenexpirationTimer) {
      clearTimeout(this.tokenexpirationTimer);
    }
    this.tokenexpirationTimer = null;
  }
}
