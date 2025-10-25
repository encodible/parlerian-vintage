import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromPeople from '../../reducers';
import {Subscription} from 'rxjs';
import {CitizenSearchResult} from '../../services/citizen-api.service';
import {CitizenChange, DeselectCitizen} from '../../actions/citizens.actions';

@Component({
    selector: 'app-citizen-change-page',
    templateUrl: './citizen-change-page.component.html',
    styleUrls: ['./citizen-change-page.component.scss']
})
export class CitizenChangePageComponent implements OnInit, OnDestroy {
    isUpdating = false;
    selectedCitizen: CitizenSearchResult = null;

    private subscriptions: Subscription[] = [];

    constructor(private route: ActivatedRoute,
                private store: Store<fromPeople.State>) {
        if (route &&
            route.snapshot.paramMap.get('isUpdating') &&
            route.snapshot.paramMap.get('isUpdating') === 'true') {
            this.isUpdating = true;
        }
        this.subscriptions.push(store.pipe(
            select(fromPeople.selectSelectedCitizen))
            .subscribe(selectedCitizen => this.updateSelectedCitizen(selectedCitizen)))
    }

    updateSelectedCitizen(selectedCitizen: CitizenSearchResult) {
        if (selectedCitizen) {
            this.selectedCitizen = selectedCitizen;
        }
    }

    changeCitizen($event) {
        this.store.dispatch(new CitizenChange($event));
    }

    deselectCitizen() {
        this.store.dispatch(new DeselectCitizen());
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
