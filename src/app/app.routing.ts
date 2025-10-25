import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {AuthGuard} from './auth/services/auth-guard.service';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'events',
        canActivate: [AuthGuard],
        pathMatch: 'full',
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            // Routes for custom items
            {
                path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            }, {
                path: 'organization',
                loadChildren: './organization/organization.module#OrganizationModule'
            }, {
                path: 'suborganizations',
                loadChildren: './suborganizations/suborganizations.module#SuborganizationsModule'
            }, {
                path: 'people',
                loadChildren: './people/people.module#PeopleModule'
            }, {
                path: 'events',
                loadChildren: './organization-events/organization-events.module#OrganizationEventsModule'
            }, {
                path: 'contacts',
                loadChildren: './contacts/contacts.module#ContactsModule'
            }, {
                path: 'assignments',
                loadChildren: './assignments/assignments.module#AssignmentsModule'
            }, {
                path: 'permissions',
                loadChildren: './permissions/permissions.module#PermissionsModule'
            }, {
                path: 'user',
                loadChildren: './auth/auth.module#AuthModule'
            }, {
                path: 'reports',
                loadChildren: './reports/reports.module#ReportsModule'
            }
        ]
    },
    // {
    //     path: '',
    //     component: AuthLayoutComponent,
    //     children: [{
    //         path: '',
    //         loadChildren: './auth/auth.module#AuthModule'
    //     }]
    // }
];
