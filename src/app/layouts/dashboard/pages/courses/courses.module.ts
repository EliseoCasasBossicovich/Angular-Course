import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CoursesService } from '../../../../core/services/courses.service';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { IgaTitleModule } from '../../../../shared/components/iga-title/iga-title.module';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [CoursesComponent, CourseFormComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    IgaTitleModule,
  ],
  exports: [CoursesComponent],
  providers: [CoursesService],
})
export class CoursesModule {}
