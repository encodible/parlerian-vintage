import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SuborganizationListComponent} from './containers/suborganization-list/suborganization-list.component';
import {SuborganizationComponent} from './components/suborganization/suborganization.component';
import {AccessibleSuborganizationsResolver} from './services/accessible-suborganizations-resolver';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {SuborganizationDetailPageComponent} from './containers/suborganization-detail-page/suborganization-detail-page.component';
import {PrecinctDetailComponent} from './components/precinct-detail/precinct-detail.component';
import {SuborganizationPageComponent} from './containers/suborganization-page/suborganization-page.component';
import {LegislativeDistrictDetailComponent} from './components/legislative-district-detail/legislative-district-detail.component';
import {SenateDistrictDetailComponent} from './components/senate-district-detail/senate-district-detail.component';
import {EffectsModule} from '@ngrx/effects';
import {SuborganizationEffects} from './effects/suborganization.effects';
import {FillablePositionsResolver} from './services/fillable-positions-resolver';
import {SuborganizationResolver} from './services/suborganization-resolver';
import {SuborganizationAssignmentsResolver} from './services/suborganization-assignments-resolver';
import {CoreModule} from '../core/core.module';
import {SuborgAssignmentListComponent} from '../core/components/suborg-assignment-list/suborg-assignment-list.component';
import {AddAssignmentComponent} from '../core/components/add-assignment/add-assignment.component';
import {SuborgAssignedPositionsComponent} from './components/suborg-assigned-positions/suborg-assigned-positions.component';
import {SelectedPositionResolver} from './services/selected-position-resolver';
import {SuborganizationPositionAssignmentResolver} from './services/suborganization-position-assignment-resolver';
import {MaterialModule} from '../material/material.module';
import {AssignmentsModule} from '../assignments/assignments.module';
import { AssignmentsActionPadComponent } from './components/assignments-action-pad/assignments-action-pad.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AssignmentsSearchPageComponent } from './assignments-search-page/assignments-search-page.component';


const suborganizationRoutes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: SuborganizationPageComponent,
                children: [
                    {
                        path: 'search',
                        component: AssignmentsSearchPageComponent
                    },
                    {
                        path: 'list',
                        component: SuborganizationListComponent,
                        resolve: {
                            accessibleSuborganizations: AccessibleSuborganizationsResolver
                        }
                    },
                    {
                        path: 'assignments',
                        children: [
                            {
                                path: ':id',
                                component: SuborganizationDetailPageComponent,
                                resolve: {
                                    fillablePositions: FillablePositionsResolver,
                                    selectedSuborganization: SuborganizationResolver,
                                    assignments: SuborganizationAssignmentsResolver
                                },
                                children: [
                                    {
                                        path: '',
                                        component: SuborgAssignmentListComponent
                                    },
                                    {
                                        path: 'assign-position',
                                        component: AddAssignmentComponent,
                                        resolve: { selectedPosition: SelectedPositionResolver }
                                    },
                                    {
                                        path: 'assigned-positions',
                                        component: SuborgAssignedPositionsComponent,
                                        resolve: {
                                            suborgPositionAssignments: SuborganizationPositionAssignmentResolver,
                                            selectedPosition: SelectedPositionResolver,
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]

    }
];

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([SuborganizationEffects]),
        MaterialModule,
        RouterModule.forChild(suborganizationRoutes),
        StoreModule.forFeature('suborganizations', reducers),
        AssignmentsModule,
        PrecinctDetailComponent,
        SenateDistrictDetailComponent,
        LegislativeDistrictDetailComponent,
        SuborgAssignedPositionsComponent,
        SuborganizationComponent,
        SuborganizationDetailPageComponent,
        SuborganizationListComponent,
        SuborganizationPageComponent,
        AssignmentsActionPadComponent,
        AssignmentsSearchPageComponent,
    ],
    declarations: [],
    providers: [
        AccessibleSuborganizationsResolver,
        FillablePositionsResolver,
        SelectedPositionResolver,
        SuborganizationAssignmentsResolver,
        SuborganizationPositionAssignmentResolver,
        SuborganizationResolver,
    ]
})
export class SuborganizationsModule {
}
