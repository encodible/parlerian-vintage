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
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            }, {
                path: 'organization',
                loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule)
            }, {
                path: 'suborganizations',
                loadChildren: () => import('./suborganizations/suborganizations.module').then(m => m.SuborganizationsModule)
            }, {
                path: 'people',
                loadChildren: () => import('./people/people.module').then(m => m.PeopleModule)
            }, {
                path: 'events',
                loadChildren: () => import('./organization-events/organization-events.module').then(m => m.OrganizationEventsModule)
            }, {
                path: 'contacts',
                loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
            }, {
                path: 'assignments',
                loadChildren: () => import('./assignments/assignments.module').then(m => m.AssignmentsModule)
            }, {
                path: 'permissions',
                loadChildren: () => import('./permissions/permissions.module').then(m => m.PermissionsModule)
            }, {
                path: 'user',
                loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
            }, {
                path: 'reports',
                loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
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
