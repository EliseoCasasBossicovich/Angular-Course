import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UsersService } from '../../../../core/services/users.service';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersRoutingModule } from './users-routing.module';
import { IgaTitleModule } from "../../../../shared/components/iga-title/iga-title.module";

@NgModule({
    declarations: [UsersComponent, UserFormComponent],
    exports: [UsersComponent],
    providers: [UsersService],
    imports: [CommonModule, SharedModule, UsersRoutingModule, IgaTitleModule]
})
export class UsersModule {}
