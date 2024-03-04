import { finalize, mergeMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../enviroments/environment.dev';
import { LoadingService } from './loading.service';
import { studentModel } from '../../shared/models/students.model';

@Injectable()
export class StudentsService {
  constructor(
    private loadingService: LoadingService,
    private httpClient: HttpClient
  ) {}

  getStudents() {
    this.loadingService.setIsLoading(true);
    return this.httpClient
      .get<studentModel[]>(`${environment.apiURL}/students`)
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }

  createStudent(payload: studentModel) {
    return this.httpClient
      .post<studentModel>(`${environment.apiURL}/students`, payload)
      .pipe(mergeMap(() => this.getStudents()))
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }

  deleteStudentById(id: number) {
    return this.httpClient
      .delete<studentModel>(`${environment.apiURL}/students/${id}`)
      .pipe(mergeMap(() => this.getStudents()))
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }

  updateStudentById(id: number, data: studentModel) {
    return this.httpClient
      .put<studentModel>(`${environment.apiURL}/students/${id}`, data)
      .pipe(mergeMap(() => this.getStudents()))
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }
}
