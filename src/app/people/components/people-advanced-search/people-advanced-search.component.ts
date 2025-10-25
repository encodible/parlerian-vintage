import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromPeople from '../../reducers';
import * as CitizenActions from '../../actions/citizens.actions';
import {CitizenAdvancedSearchForm} from '../../services/citizen-api.service';

@Component({
    selector: 'app-people-advanced-search',
    templateUrl: './people-advanced-search.component.html',
    styleUrls: ['./people-advanced-search.component.scss']
})
export class PeopleAdvancedSearchComponent {

    constructor(private store: Store<fromPeople.State>) {
    }

    onSearch(e: CitizenAdvancedSearchForm) {
        this.store.dispatch(new CitizenActions.AdvancedSearch(e))
    }
}


