import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from '@ngrx/store';
import * as fromPeople from '../../reducers';
import * as CitizenActions from '../../actions/citizens.actions';
import {CitizenAdvancedSearchForm} from '../../services/citizen-api.service';
import {AdvancedSearchComponent} from '../../../core/components/advanced-search/advanced-search.component';

@Component({
    selector: 'app-people-advanced-search',
    templateUrl: './people-advanced-search.component.html',
    styleUrls: ['./people-advanced-search.component.scss'],
    standalone: true,
    imports: [CommonModule, AdvancedSearchComponent]
})
export class PeopleAdvancedSearchComponent {

    constructor(private store: Store<fromPeople.State>) {
    }

    onSearch(e: CitizenAdvancedSearchForm) {
        this.store.dispatch(new CitizenActions.AdvancedSearch(e))
    }
}


