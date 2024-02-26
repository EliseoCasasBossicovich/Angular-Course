import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StudentsComponent } from './students.component';
import { NotFoundComponent } from '../not-found/not-found.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StudentsComponent,
      },
      {
        path: '404',
        component: NotFoundComponent,
      },
      {
        path: '**',
        redirectTo: '/404',
      },
    ]),
  ],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
