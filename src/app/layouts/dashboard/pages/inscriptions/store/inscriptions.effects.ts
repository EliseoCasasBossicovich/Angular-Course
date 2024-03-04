import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionsService } from '../../../../../core/services/inscriptions.service';

@Injectable()
export class InscriptionsEffects {
  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadInscriptions),
      concatMap(() =>
        this.enrollmentsService.getInscriptions().pipe(
          map((data) => InscriptionsActions.loadInscriptionsSuccess({ data })),
          catchError((error) =>
            of(InscriptionsActions.loadInscriptionsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private enrollmentsService: InscriptionsService
  ) {}
}
