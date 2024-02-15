import { Injectable } from '@angular/core';
import { studentModel } from '../../shared/models/students.model';
import {
  Observable,
  catchError,
  concatMap,
  delay,
  mergeMap,
  of,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertsService } from './alerts.service';
import { environment } from '../../../enviroments/environment';
import { Pagination } from '../../shared/models/pagination';

const ROLES_DB: string[] = ['ADMIN', 'USER'];

let STUDENTS_DB: studentModel[] = [];

@Injectable()
export class StudentsService {
  constructor(private alerts: AlertsService, private httpClient: HttpClient) {}

  generateRandomNumberString(length: number): string {
    const characters = '0123456789';
    const charactersArray = Array.from(new Set(characters));
    const charactersLength = charactersArray.length;
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = randomValues[i] % charactersLength;
      result += charactersArray[randomIndex];
    }
    return result;
  }

  getStudentsById(id: number | string): Observable<studentModel | undefined> {
    return this.httpClient.get<studentModel>(
      `${environment.apiURL}/students/${id}`
    );
  }

  getRoles(): Observable<string[]> {
    return of(ROLES_DB).pipe(delay(1000));
  }

  getStudents() {
    return this.httpClient
      .get<studentModel[]>(`${environment.apiURL}/students`, {})
      .pipe(
        catchError((error) => {
          this.alerts.showError('Error al cargar los usuarios');
          return of([]);
        })
      );
  }

  paginate(page: number, perPage = 5) {
    return this.httpClient.get<Pagination<studentModel>>(
      `${environment.apiURL}/students?_page=${page}&_per_page=${perPage}`
    );
  }

  createStudents(payload: studentModel) {
    return this.httpClient
      .post<studentModel>(`${environment.apiURL}/students`, {
        ...payload,
        token: this.generateRandomNumberString(8),
      })
      .pipe(mergeMap(() => this.getStudents()));
  }

  updateStudentsById(
    id: number | string,
    data: Partial<studentModel>
  ): Observable<studentModel> {
    return this.httpClient
      .get<studentModel>(`${environment.apiURL}/students/${id}`)
      .pipe(
        concatMap((student: studentModel) => {
          const updatedStudent = { ...student, ...data };
          return this.httpClient
            .put<studentModel>(
              `${environment.apiURL}/students/${id}`,
              updatedStudent
            )
            .pipe(
              catchError((error) => {
                console.error('Error updating student:', error);
                return throwError(error);
              })
            );
        }),
        catchError((error) => {
          console.error('Error fetching student:', error);
          return throwError(error);
        })
      );
  }

  deleteStudent(studentID: number) {
    return this.httpClient
      .delete<studentModel>(`${environment.apiURL}/students/${studentID}`)
      .pipe(mergeMap(() => this.getStudents()));
  }
}
