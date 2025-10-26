import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportPageComponent} from './containers/report-page/report-page.component';
import {RouterModule} from '@angular/router';
import { ReportsActionPadComponent } from './components/reports-action-pad/reports-action-pad.component';
import { PositionReportComponent } from './containers/position-report/position-report.component';
import { DistrictReportComponent } from './containers/district-report/district-report.component';
import { PositionReportSelectorComponent } from './components/position-report-selector/position-report-selector.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: '',
                        component: ReportPageComponent,
                        children: [
                            {
                                path: 'position',
                                component: PositionReportComponent
                            },
                            {
                                path: 'district',
                                component: DistrictReportComponent
                            }
                        ]
                    }
                ]
            }
        ]),
        ReportPageComponent,
        ReportsActionPadComponent,
        PositionReportComponent,
        DistrictReportComponent,
        PositionReportSelectorComponent
    ],
    declarations: []
})
export class ReportsModule {
}
