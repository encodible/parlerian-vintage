import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromPeople from '../../reducers';
import * as CitizenActions from '../../actions/citizens.actions';

@Component({
    selector: 'app-people-search',
    templateUrl: './people-search.component.html',
    styleUrls: ['./people-search.component.scss']
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
