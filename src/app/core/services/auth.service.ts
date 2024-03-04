import { of, map, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../../enviroments/environment.dev';
import { userModel } from '../../shared/models/user.model';

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  authUser: userModel | null = null;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {}

  private setAuthUser(user: userModel): void {
    this.authUser = user;
    localStorage.setItem(
      'token',
      user.token ? user.token : Math.random().toString(8)
    );
  }

  login(data: LoginData): void {
    this.httpClient
      .get<userModel[]>(
        `${environment.apiURL}/users?email=${data.email}&password=${data.password}`
      )
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.setAuthUser(response[0]);
            this.router.navigate(['dashboard', 'home']);
          } else {
            this._snackBar.open('Usuario o contraseña incorrectos', 'cerrar', {
              duration: 2000,
            });
          }
        },
      });
  }

  logout(): void {
    this.authUser = null;
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('token');
  }

  verifyToken() {
    return this.httpClient
      .get<userModel[]>(
        `${environment.apiURL}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((response) => {
          if (response.length > 0) {
            this.setAuthUser(response[0]);
            return true;
          } else {
            this.authUser = null;
            localStorage.removeItem('token');
            this._snackBar.open('Usuario sin token', 'cerrar', {
              duration: 2000,
            });
            return false;
          }
        }),
        catchError(() => of(false))
      );
  }
}
