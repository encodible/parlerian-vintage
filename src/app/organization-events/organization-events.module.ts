import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventListComponent} from './components/event-list/event-list.component';
import {RouterModule} from '@angular/router';
import {AttendanceListComponent} from './components/attendance-list/attendance-list.component';
import {AttendeeComponent} from './components/attendee/attendee.component';
import {OrganizationEventsService} from './services/organization-events.service';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {EffectsModule, Actions} from '@ngrx/effects';
import {OrganizationEventsEffects} from './effects/organization-events.effects';
import {OrganizationEventsPageComponent} from './containers/organization-events-page/organization-events-page.component';
import {EventCalendarComponent} from './components/event-calendar/event-calendar.component';
import {EventListResolver} from './services/event-list-resolver';
import { EventListContainerComponent } from './containers/event-list-container/event-list-container.component';
import { AttendanceListContainerComponent } from './containers/attendance-list-container/attendance-list-container.component';
import {AttendanceListResolver} from './services/attendance-list-resolver';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { CheckInCitizenPageComponent } from './containers/check-in-citizen-page/check-in-citizen-page.component';
import { CheckInFormComponent } from './components/check-in-form/check-in-form.component';
import {MaterialModule} from '../material/material.module';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventCreationPageComponent } from './containers/event-creation-page/event-creation-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';

const organizationEventsRoutes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: OrganizationEventsPageComponent,
                resolve: {
                    eventInfoList: EventListResolver
                },
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                    },
                    {
                        path: 'list',
                        component: EventListContainerComponent
                    },
                    {
                        path: 'new',
                        component: EventCreationPageComponent
                    },
                    {
                        path: ':id',
                        component: AttendanceListContainerComponent,
                        resolve: {
                            attendanceList: AttendanceListResolver
                        }
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
        EffectsModule.forFeature([OrganizationEventsEffects]),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forChild(organizationEventsRoutes),
        StoreModule.forFeature('organization-events', reducers),
        TableModule,
        ButtonModule
    ],
    declarations: [
        AttendanceListComponent,
        AttendanceListContainerComponent,
        AttendeeComponent,
        EventCalendarComponent,
        EventListComponent,
        EventListContainerComponent,
        OrganizationEventsPageComponent,
        CheckInCitizenPageComponent,
        CheckInFormComponent,
        EventFormComponent,
        EventCreationPageComponent,
    ],
    providers: [
        AttendanceListResolver,
        EventListResolver,
        OrganizationEventsService
    ]
})
export class OrganizationEventsModule {
}
