import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { LoginValidationErrorsPipe } from './pipes/login-validation-errors.pipe';
import { CalculateAgePipe } from './pipes/calculate-age.pipe';
import { titleStyleDirective } from './title-style.directive';
import { FullNamePipe } from './pipes/full-name.pipe';

@NgModule({
  declarations: [FullNamePipe, CalculateAgePipe, titleStyleDirective, LoginValidationErrorsPipe],
  imports: [CommonModule],
  exports: [FullNamePipe, CalculateAgePipe, titleStyleDirective, MatCardModule, MatFormFieldModule, ReactiveFormsModule, LoginValidationErrorsPipe, MatIconModule],
})
export class SharedModule {}
