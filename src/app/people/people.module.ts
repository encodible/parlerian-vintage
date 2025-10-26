import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PeopleListComponent} from './components/people-list/people-list.component';
import {PersonComponent} from './components/person/person.component';
import {PeoplePageComponent} from './containers/people-page/people-page.component';
import {PeopleSearchComponent} from './components/people-search/people-search.component';
import {PeopleAdvancedSearchComponent} from './components/people-advanced-search/people-advanced-search.component';
import {CitizenChangePageComponent} from './containers/citizen-change-page/citizen-change-page.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CitizenApi} from './services/citizen-api.service';
import {PeopleEffects} from './effects/people.effects';
import {EffectsModule, Actions} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {PeopleActionPadComponent} from './people-action-pad/people-action-pad.component';
import {SearchResultGuard} from './services/search-result-guard';
import {PeopleActionPadNavComponent} from './people-action-pad-nav/people-action-pad-nav.component';
import {CitizenSelectedGuard} from './services/citizen-selected-guard';
import {CoreModule} from '../core/core.module';

const peopleRoutes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: PeoplePageComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'quick-search'
                    },
                    {
                        path: 'quick-search',
                        component: PeopleSearchComponent
                    },
                    {
                        path: 'advanced-search',
                        component: PeopleAdvancedSearchComponent
                    },
                    {
                        path: 'add',
                        component: CitizenChangePageComponent,
                        data: {isUpdating: false}
                    },
                    {
                        path: 'list',
                        canActivate: [SearchResultGuard],
                        component: PeopleListComponent,
                        data: { animation: 'PeopleList'}
                    },
                    {
                        path: ':id',
                        component: CitizenChangePageComponent,
                        canActivate: [CitizenSelectedGuard]
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
        EffectsModule.forFeature([PeopleEffects]),
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule.forChild(peopleRoutes),
        StoreModule.forFeature('citizens', reducers),
        CitizenChangePageComponent,
        PeopleListComponent,
        PersonComponent,
        PeoplePageComponent,
        PeopleSearchComponent,
        PeopleAdvancedSearchComponent,
        PeopleActionPadComponent,
        PeopleActionPadNavComponent,
    ],
    declarations: [],
    providers: [
        CitizenApi
    ]
})
export class PeopleModule {
}
