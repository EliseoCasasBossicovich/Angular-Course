import { of } from 'rxjs';

export class MockAuthService {
  authUser: any = null;

  login(data: { email: string; password: string }): void {
    const MOCK_USER = {
      id: 9999,
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
      localStorage.setItem('token', 'jfiumba3334432423sarasasarasa2');
    } else {
      throw new Error('Email o password invalidos');
    }
  }

  logout(): void {
    this.authUser = null;
    localStorage.removeItem('token');
  }

  verifyToken() {
    return of(localStorage.getItem('token') !== null);
  }
}
