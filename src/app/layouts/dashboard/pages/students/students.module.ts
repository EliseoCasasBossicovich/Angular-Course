import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsComponent } from './students.component';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentsService } from '../../../../core/services/students.service';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { IgaTitleModule } from '../../../../shared/components/iga-title/iga-title.module';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [StudentsComponent, StudentFormComponent],
  exports: [StudentsComponent],
  imports: [CommonModule, SharedModule, StudentsRoutingModule, MatOptionModule, MatTableModule, IgaTitleModule],
  providers: [StudentsService],
})
export class StudentsModule {}
