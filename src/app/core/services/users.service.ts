import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, mergeMap } from 'rxjs';

import { userModel } from '../../shared/models/user.model';
import { LoadingService } from './loading.service';
import { environment } from '../../../enviroments/environment.dev';

@Injectable()
export class UsersService {
  constructor(
    private loadingService: LoadingService,
    private httpClient: HttpClient
  ) {}

  getUsers() {
    this.loadingService.setIsLoading(true);
    return this.httpClient
      .get<userModel[]>(`${environment.apiURL}/users`)
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }

  createUser(payload: userModel) {
    return this.httpClient
      .post<userModel>(`${environment.apiURL}/users`, payload)
      .pipe(mergeMap(() => this.getUsers()))
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }

  deleteUsersById(id: number) {
    return this.httpClient
      .delete<userModel>(`${environment.apiURL}/users/${id}`)
      .pipe(mergeMap(() => this.getUsers()))
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }

  updateUserById(id: number, data: userModel) {
    return this.httpClient
      .put<userModel>(`${environment.apiURL}/users/${id}`, data)
      .pipe(mergeMap(() => this.getUsers()))
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }
}
