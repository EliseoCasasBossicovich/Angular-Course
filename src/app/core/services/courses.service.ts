import { Injectable } from '@angular/core';
import { finalize, mergeMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Course } from '../../shared/models/courses.model';
import { LoadingService } from './loading.service';
import { environment } from '../../../enviroments/environment.dev';

@Injectable()
export class CoursesService {
  constructor(
    private loadingService: LoadingService,
    private httpClient: HttpClient
  ) {}

  getCourses() {
    this.loadingService.setIsLoading(true);
    return this.httpClient
      .get<Course[]>(`${environment.apiURL}/courses`)
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }

  createCourse(data: Course) {
    return this.httpClient
      .post<Course>(`${environment.apiURL}/courses`, data)
      .pipe(mergeMap(() => this.getCourses()))
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }

  deleteCourseById(id: number) {
    return this.httpClient
      .delete<Course>(`${environment.apiURL}/courses/${id}`)
      .pipe(mergeMap(() => this.getCourses()))
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }

  updateCourseById(id: number, data: Course) {
    return this.httpClient
      .put<Course>(`${environment.apiURL}/courses/${id}`, data)
      .pipe(mergeMap(() => this.getCourses()))
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }
}
