import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StudentDetailComponent } from './student-detail.component';

@NgModule({
  declarations: [StudentDetailComponent],
  imports: [CommonModule],
  exports: [StudentDetailComponent],
})
export class StudentDetailModule {}
