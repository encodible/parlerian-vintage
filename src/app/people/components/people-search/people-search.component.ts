import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from '@ngrx/store';
import * as fromPeople from '../../reducers';
import * as CitizenActions from '../../actions/citizens.actions';
import {QuickSearchComponent} from '../../../core/components/quick-search/quick-search.component';
import {NameSearchComponent} from '../../../core/components/name-search/name-search.component';

@Component({
    selector: 'app-people-search',
    templateUrl: './people-search.component.html',
    styleUrls: ['./people-search.component.scss'],
    standalone: true,
    imports: [CommonModule, QuickSearchComponent, NameSearchComponent]
})
export class PeopleSearchComponent implements OnInit {



    constructor(private store: Store<fromPeople.State>) {
    }

    ngOnInit() {
    }

    quickSearch($event) {
        this.store.dispatch(new CitizenActions.QuickSearch($event))
    }

    nameSearch($event) {
        this.store.dispatch(new CitizenActions.NameSearch($event))
    }

}
