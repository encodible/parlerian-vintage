import {Routes} from '@angular/router';
import {OrganizationProfileComponent} from './organization-profile/organization-profile.component';

/**
 * @author Kent Bull
 */

export const OrganizationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: OrganizationProfileComponent
            }
        ]

    }
];
