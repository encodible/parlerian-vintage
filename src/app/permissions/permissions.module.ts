import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PermissionsListComponent} from './containers/permissions-list/permissions-list.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: '',
                        component: PermissionsListComponent
                    }
                ]
            }
        ])
    ],
    declarations: [PermissionsListComponent]
})
export class PermissionsModule {
}
