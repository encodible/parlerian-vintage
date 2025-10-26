import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ContactListComponent} from './containers/contact-list/contact-list.component';
import {ContactComponent} from './containers/contact/contact.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: '',
                        component: ContactListComponent
                    }
                ]
            }
        ]),
        ContactListComponent,
        ContactComponent
    ],
    declarations: []
})
export class ContactsModule {
}
