import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { IgaButtonLinkModule } from '../../../../shared/components/iga-button-link/iga-button-link.module';
import { IgaTitleModule } from '../../../../shared/components/iga-title/iga-title.module';


@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, IgaButtonLinkModule, IgaTitleModule],
})
export class NotFoundModule {}
