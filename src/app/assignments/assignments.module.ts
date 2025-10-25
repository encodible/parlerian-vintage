import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {TableModule} from 'primeng/table';
import {MaterialModule} from '../material/material.module';
import {AssignmentListComponent} from './components/assignment-list/assignment-list.component';
import {AssignmentsPageComponent} from './containers/assignments-page/assignments-page.component';
import {AssignmentsResolver} from './services/assignments-resolver';
import {reducers} from './reducers';
import {MissingPositionsComponent} from './components/missing-positions/missing-positions.component';
// tslint:disable-next-line:max-line-length
import {AccessiblePositionsContainerComponent} from './containers/accessible-positions-container/accessible-positions-container.component';
import {MissingPositionsContainerComponent} from './missing-positions-container/missing-positions-container.component';
import {AllocationsResolver} from './services/allocations-resolver';
import {AssignmentDetailComponent} from './components/assignment-detail/assignment-detail.component';
import { AssignmentUpdateFormComponent } from './assignment-update-form/assignment-update-form.component';
import {CoreModule} from '../core/core.module';
import { AssignmentSimpleListComponent } from './assignment-simple-list/assignment-simple-list.component';

const assignmentsRoutes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AssignmentsPageComponent,
                resolve: {
                    accessiblePositions: AssignmentsResolver,
                    allocations: AllocationsResolver
                },
                children: [
                    {
                        path: '',
                        redirectTo: 'all'
                    },
                    {
                        path: 'all',
                        component: AccessiblePositionsContainerComponent
                    },
                    {
                        path: 'missing',
                        component: MissingPositionsContainerComponent
                    },
                    {
                        path: 'edit',
                        children: [
                            {
                                path: ':id',
                                component: AssignmentDetailComponent
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
        RouterModule.forChild(assignmentsRoutes),
        MaterialModule,
        StoreModule.forFeature('assignments', reducers),
        // TableModule,
    ],
    declarations: [
        AssignmentDetailComponent,
        AssignmentListComponent,
        AssignmentsPageComponent,
        MissingPositionsComponent,
        AccessiblePositionsContainerComponent,
        MissingPositionsContainerComponent,
        AssignmentUpdateFormComponent,
        AssignmentSimpleListComponent,
    ],
    exports: [
        AssignmentSimpleListComponent
    ],
    providers: [
        AllocationsResolver,
        AssignmentsResolver
    ]
})
export class AssignmentsModule {
}
