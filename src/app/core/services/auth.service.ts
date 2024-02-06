import { Injectable } from '@angular/core';
import { studentModel } from '../../shared/models/students.model';
import { Router } from '@angular/router';
import { AlertsService } from '../../core/services/alerts.service';
import { delay, finalize, map, of } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  authUser: studentModel | null = null;

  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private loadingService: LoadingService
  ) {}

  login(data: LoginData): void {
    const MOCK_USER = {
      id: '22229ab5-14b9-488e-9105-a0aca00dde3c',
      firstName: 'test',
      lastName: 'tester',
      birthDate: '0000-00-00',
      email: 'testing@gmail.com',
      cellPhone: 3343333234,
      country: 'Argentina',
      role: 'ADMIN',
      password: '123233',
    };
    if (
      data.email === MOCK_USER.email &&
      data.password === MOCK_USER.password
    ) {
      this.authUser = MOCK_USER;
      localStorage.setItem(
        'token',
        'jfiumba3334432423sarasasarasa2'
      );
      this.router.navigate(['dashboard', 'home']);
    } else {
      this.alertsService.showError('Email o password invalidos');
    }
  }

  logout(): void {
    this.authUser = null;
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('token');
  }

  verifyToken() {
    this.loadingService.setIsLoading(true);
    return of(localStorage.getItem('token')).pipe(
      delay(1000),
      map((response) => !!response),
      finalize(() => this.loadingService.setIsLoading(false))
    );
  }
}
