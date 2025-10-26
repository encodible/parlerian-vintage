import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';

import {WidgetsComponent} from './widgets.component';
import {WidgetsRoutes} from './widgets.routing';

@NgModule({
    imports: [
        RouterModule.forChild(WidgetsRoutes),
        CommonModule,
        FormsModule,
        MaterialModule,
        WidgetsComponent
    ],
    declarations: []
})

export class WidgetsModule {}
