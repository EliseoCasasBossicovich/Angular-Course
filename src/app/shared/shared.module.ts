import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { LoginValidationErrorsPipe } from './pipes/login-validation-errors.pipe';
import { CalculateAgePipe } from './pipes/calculate-age.pipe';
import { titleStyleDirective } from './directives/title-style.directive';
import { FullNamePipe } from './pipes/full-name.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FullNameInscriptionsPipe } from './pipes/full-name-enrollment.pipe';

@NgModule({
  declarations: [
    FullNamePipe,
    CalculateAgePipe,
    titleStyleDirective,
    LoginValidationErrorsPipe,
    FullNameInscriptionsPipe,
  ],
  imports: [CommonModule],
  exports: [
    FullNamePipe,
    CalculateAgePipe,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    LoginValidationErrorsPipe,
    FullNameInscriptionsPipe,
  ],
})
export class SharedModule {}
