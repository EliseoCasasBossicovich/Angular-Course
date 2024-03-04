import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionsEffects } from './store/inscriptions.effects';
import { SharedModule } from '../../../../shared/shared.module';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';
import { enrollmentsFeature } from './store/inscriptions.reducer';
import { IgaTitleModule } from "../../../../shared/components/iga-title/iga-title.module";
import { InscriptionsRoutingModule } from './inscriptions-routing.module';

@NgModule({
    declarations: [InscriptionsComponent],
    providers: [InscriptionsService],
    imports: [
        CommonModule,
        SharedModule,
        InscriptionsRoutingModule,
        StoreModule.forFeature(enrollmentsFeature),
        EffectsModule.forFeature([InscriptionsEffects]),
        IgaTitleModule
    ]
})
export class InscriptionsModule {}
