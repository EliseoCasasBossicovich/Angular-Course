import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import {
  selectInscriptions,
  selectInscriptionsIsLoading,
} from './store/inscriptions.selectors';
import { InscriptionsActions } from './store/inscriptions.actions';

import { Inscriptions } from '../../../../shared/models/inscriptions.model';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss',
})
export class InscriptionsComponent implements OnDestroy {
[x: string]: any;
  displayedColumns: string[] = ['id', 'courseName', 'firstName', 'actions'];
  enrollments: Inscriptions[] = [];
  isLoading$: Observable<boolean>;
  enrollmentsSubscription?: Subscription;
  desctoyed$ = new Subject();

  constructor(private store: Store) {
    this.store
      .select(selectInscriptions)
      .pipe(takeUntil(this.desctoyed$))
      .subscribe({
        next: (enrollments) => {
          this.enrollments = enrollments;
        },
      });

    this.isLoading$ = this.store.select(selectInscriptionsIsLoading);
    this.store.dispatch(InscriptionsActions.loadInscriptions());
  }

  ngOnDestroy(): void {
    this.desctoyed$.next(true);
    this.desctoyed$.complete();
  }
}
