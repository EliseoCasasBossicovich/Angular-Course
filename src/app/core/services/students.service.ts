import { Injectable, Inject } from '@angular/core';
import { studentModel } from '../../shared/models/students.model';
import { delay, of } from 'rxjs';

const STUDENTS_DB: studentModel[] = [
  {
    id: '4c6a1be1-9a27-4371-435e-eba0dae7bbdc',
    firstName: 'Juan Cruz',
    lastName: 'Gomez',
    birthDate: '2000-06-23',
    email: 'jxg@gmail.com',
    cellPhone: 3343333234,
    country: 'Argentina',
  },
  {
    id: '22229ab5-14b9-488e-9105-a0aca00dde3c',
    firstName: 'Viecente',
    lastName: 'Torrez',
    birthDate: '2002-01-10',
    email: 'vt@gmail.com',
    cellPhone: 3343333234,
    country: 'Argentina',
  },
  {
    id: '95347731-7f94-1be3-af93-2acac36658e0',
    firstName: 'Maria',
    lastName: 'Perez',
    birthDate: '1998-12-5',
    email: 'mp@gmail.com',
    cellPhone: 3343333234,
    country: 'Uruguay',
  },
];

@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  constructor(@Inject('USER_TOKEN') userToken: string) { 
    console.log('Se instanció el servicio', userToken);
  }

  gestStudents() {
    return of (STUDENTS_DB).pipe(delay(2000));
  }
}