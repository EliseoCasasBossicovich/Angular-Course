import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { Inscriptions } from '../../../../../shared/models/inscriptions.model';


export const enrollmentsFeatureKey = 'enrollments';

export interface State {
  enrollments: Inscriptions[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  enrollments: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, (state) => ({
    ...state,
    loading: true,
  })),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => ({
    ...state,
    loading: false,
    enrollments: action.data,
  })),
  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);

export const enrollmentsFeature = createFeature({
  name: enrollmentsFeatureKey,
  reducer,
});
