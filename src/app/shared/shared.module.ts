import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { CalculateAgePipe } from './pipes/calculate-age.pipe';
import { titleStyleDirective } from './title-style.directive';
import { HomeComponent } from '../layouts/dashboard/pages/home/home.component';


@NgModule({
  declarations: [FullNamePipe, CalculateAgePipe, titleStyleDirective, HomeComponent],
  imports: [CommonModule],
  exports: [FullNamePipe, CalculateAgePipe, titleStyleDirective],
})
export class SharedModule {}
