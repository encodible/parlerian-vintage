import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {OrganizationProfileComponent} from './organization-profile/organization-profile.component';
import {OrganizationRoutes} from './organization.routing';
import {MaterialModule} from '../material/material.module';
import {MdModule} from '../core/containers/md/md.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(OrganizationRoutes),
        MdModule,
        MaterialModule,
        OrganizationProfileComponent
    ],
    declarations: []
})
export class OrganizationModule {
}
