import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';

import { SharedModule } from '../../../../shared/shared.module';
import { StudentsComponent } from './students.component';
import { StudentsService } from '../../../../core/services/students.service';
import { StudentFormModule } from './components/student-form/student-form.module';
import { IgaTitleModule } from '../../../../shared/components/iga-title/iga-title.module';
import { StudentDetailModule } from './pages/student-detail/stuedent-detail.module';

@NgModule({
  declarations: [StudentsComponent,],
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
    MatPaginator,
    MatLabel,
    RouterModule,
    StudentFormModule,
    IgaTitleModule,
    StudentDetailModule,
  ],
  exports: [StudentsComponent],
  providers: [StudentsService],
})
export class StudentsModule {}
