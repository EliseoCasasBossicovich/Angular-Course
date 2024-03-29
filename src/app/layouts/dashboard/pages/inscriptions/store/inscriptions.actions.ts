import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscriptions } from '../../../../../shared/models/inscriptions.model';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: Inscriptions[] }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),
  },
});
