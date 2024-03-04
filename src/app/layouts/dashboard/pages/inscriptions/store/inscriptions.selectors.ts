import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscriptions from './inscriptions.reducer';

export const selectInscriptionsState =
  createFeatureSelector<fromInscriptions.State>(
    fromInscriptions.enrollmentsFeatureKey
  );

export const selectInscriptions = createSelector(
  selectInscriptionsState,
  (state) => state.enrollments
);

export const selectInscriptionsIsLoading = createSelector(
  selectInscriptionsState,
  (state) => state.loading
);
