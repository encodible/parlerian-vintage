import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MdModule} from '../core/containers/md/md.module';
import {MaterialModule} from '../material/material.module';

import {DashboardComponent} from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {

                path: '',
                children: [ {
                    path: 'dashboard',
                    component: DashboardComponent
                }]
            }
        ]),
        FormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [DashboardComponent]
})

export class DashboardModule {}
