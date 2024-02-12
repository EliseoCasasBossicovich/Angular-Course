import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { IgaTitleModule } from '../../../../shared/components/iga-title/iga-title.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IgaTitleModule,
  ],

  exports: [HomeComponent],
})
export class HomeModule { }
