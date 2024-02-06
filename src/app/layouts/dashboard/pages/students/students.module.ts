import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentsComponent } from './students.component';
import { StudentsService } from '../../../../core/services/students.service';
@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormComponent,
    StudentDetailComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [StudentsComponent],
  providers: [
    StudentsService,
    {
      provide: 'USER_TOKEN',
      useValue: '4453terggr4232fjuyy',
    },
  ],
})
export class StudentsModule {}
