import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { CalculateAgePipe } from './pipes/calculate-age.pipe';
import { titleStyleDirective } from './title-style.directive';


@NgModule({
  declarations: [FullNamePipe, CalculateAgePipe, titleStyleDirective],
  imports: [CommonModule],
  exports: [FullNamePipe, CalculateAgePipe, titleStyleDirective],
})
export class SharedModule {}
