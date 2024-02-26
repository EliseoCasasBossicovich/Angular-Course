import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { StudentFormComponent } from './student-form.component';
import { IgaTitleModule } from '../../../../../../shared/components/iga-title/iga-title.module';

@NgModule({
  declarations: [StudentFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    IgaTitleModule,
  ],
  exports: [StudentFormComponent],
})
export class StudentFormModule {}
