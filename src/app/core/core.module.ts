import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutViciComponent} from './containers/about-vici/about-vici.component';
import {SuborgAssignmentListComponent} from './components/suborg-assignment-list/suborg-assignment-list.component';
import {AddAssignmentComponent} from './components/add-assignment/add-assignment.component';
import {QuickSearchComponent} from './components/quick-search/quick-search.component';
import {FieldErrorDisplayComponent} from './components/field-error-display/field-error-display.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {AssignmentFormComponent} from './components/assignment-form/assignment-form.component';
import { CitizenSelectionListComponent } from './components/citizen-selection-list/citizen-selection-list.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { CitizenFormComponent } from './components/citizen-form/citizen-form.component';
import {NameSearchComponent} from './components/name-search/name-search.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AdvancedSearchComponent,
        AboutViciComponent,
        AddAssignmentComponent,
        AssignmentFormComponent,
        FieldErrorDisplayComponent,
        NameSearchComponent,
        QuickSearchComponent,
        CitizenSelectionListComponent,
        CitizenFormComponent,
    ],
    exports: [
        AdvancedSearchComponent,
        AssignmentFormComponent,
        FieldErrorDisplayComponent,
        NameSearchComponent,
        QuickSearchComponent,
        CitizenFormComponent,
    ],
    providers: []
})
export class CoreModule {

    // prevents services from being injected twice by checking if they are already created.
    // https://medium.com/@michelestieven/organizing-angular-applications-f0510761d65a
    // constructor(@Optional() @SkipSelf() core: CoreModule) {
    //     if (core) {
    //         throw new Error('Core module already created.');
    //     }
    // }
}
