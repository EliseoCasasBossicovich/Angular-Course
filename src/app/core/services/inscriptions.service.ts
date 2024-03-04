import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../enviroments/environment.dev';
import { Inscriptions } from '../../shared/models/inscriptions.model';

@Injectable({ providedIn: 'root' })
export class InscriptionsService {
  constructor(private http: HttpClient) {}

  getInscriptions() {
    return this.http.get<Inscriptions[]>(
      `${environment.apiURL}/inscriptions?_embed=student&_embed=course`
    );
  }
}
