import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IgaButtonLinkComponent } from './iga-button-link.component';

@NgModule({
  declarations: [IgaButtonLinkComponent],
  imports: [CommonModule, RouterModule],
  exports: [IgaButtonLinkComponent],
})
export class IgaButtonLinkModule {}
