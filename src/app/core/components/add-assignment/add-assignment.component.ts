import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as _ from 'lodash';

import {PositionToFill} from '../../../assignments/positions';
import * as fromSuborgs from '../../../suborganizations/reducers';
import {Suborganization} from '../../../suborganizations/models/suborganization';
import * as SuborgActions from '../../../suborganizations/actions/suborganization.actions';
import {CitizenChangeForm, CitizenSearchResult} from '../../../people/services/citizen-api.service';
import {PositionAssignmentForm} from '../../../assignments/position-assignments';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-add-assignment',
    templateUrl: './add-assignment.component.html',
    styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnDestroy {

    citizenSearchResults: CitizenSearchResult[];
    positionToAssign$: Observable<PositionToFill>;
    selectedSuborganization$: Observable<Suborganization>;
    searchResults$: Observable<CitizenSearchResult[]>;

    initCitizen: CitizenSearchResult = null;
    selectedPosition: PositionToFill = null;
    selectedSuborganization: Suborganization = null;

    isAddingCitizen = false;
    isAdvancedSearching = false;
    isAssigning = false;
    isPositionSelected = false;
    isQuickSearching = true;
    isSearching = false;
    isSelecting = false;
    isSuborganizationSelected = false;

    private subscriptions: Subscription[] = [];

    constructor(private store: Store<fromSuborgs.State>,
                private router: Router,
                private route: ActivatedRoute) {
        this.positionToAssign$ = store.pipe(
            select(state => state.suborganizations.suborganizations.selectedPosition)
        );
        this.subscriptions.push(
            this.positionToAssign$.subscribe(this.updateSelectedPosition.bind(this)));
        this.selectedSuborganization$ = store.pipe(
            select(state => state.suborganizations.suborganizations.selectedSuborganization)
        );
        this.subscriptions.push(
            this.selectedSuborganization$.subscribe(this.updateSelectedSuborganization.bind(this))
        );
        this.searchResults$ = store.pipe(
            select(state => state.suborganizations.suborganizations.citizenSearchResults),
        );
        this.searchResults$.subscribe(this.updateSearchResults.bind(this));
        this.subscriptions.push(store.pipe(
            select(state => state.suborganizations.suborganizations.selectedCitizen))
            .subscribe(this.updateSelectedCitizen.bind(this)));
    }

    advancedSearch($event) {
        this.store.dispatch(new SuborgActions.AdvancedSearch($event));
        this.showSelectCitizen();
    }

    addCitizen($event: CitizenChangeForm) {
        this.store.dispatch(new SuborgActions.AddCitizen($event));
        this.showAssignPosition()
    }

    assignPosition($event) {
        console.log(`Assigning position with data ${JSON.stringify($event)}`);
        const assignmentForm: PositionAssignmentForm = {
            address: $event.streetAddress ? $event.streetAddress : '',
            assigneePersonId: this.initCitizen.personId,
            assigneeVoterId: this.initCitizen.stateVoterId,
            assigningPositionAssignmentId: 0,
            emailAddress: $event.email ? $event.email : '',
            firstName: $event.firstName ? $event.firstName : '',
            middleName: $event.middleName ? $event.middleName : '',
            lastName: $event.lastName ? $event.lastName : '',
            notify: false,
            phone: $event.phone ? $event.phone : '',
            positionId: this.selectedPosition.positionId,
            positionName: this.selectedPosition.positionName,
            suborganizationId: this.selectedSuborganization.id,
            suborganizationName: this.selectedSuborganization.commonName

        };
        this.store.dispatch(new SuborgActions.AssignPosition(assignmentForm));
        this.router.navigate(['../'], {relativeTo: this.route});
        this.isSelecting = true;
    }


    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    quickSearch($event) {
        this.store.dispatch(new SuborgActions.QuickSearch($event));
        this.showSelectCitizen();
    }

    showAddCitizen() {
        this.isAdvancedSearching = false;
        this.isAddingCitizen = true;
        this.isAssigning = false;
        this.isQuickSearching = false;
        this.isSelecting = false;
        this.isSearching = false;
    }

    showAdvancedSearch() {
        this.isAdvancedSearching = true;
        this.isAddingCitizen = false;
        this.isAssigning = false;
        this.isQuickSearching = false;
        this.isSelecting = false;
        this.isSearching = true;
    }

    showAssignPosition() {
        this.isAdvancedSearching = false;
        this.isAddingCitizen = false;
        this.isAssigning = true;
        this.isQuickSearching = false;
        this.isSelecting = false;
        this.isSearching = false;
    }

    showQuickSearch() {
        this.isAdvancedSearching = false;
        this.isAddingCitizen = false;
        this.isAssigning = false;
        this.isQuickSearching = true;
        this.isSelecting = false;
        this.isSearching = true;
    }

    showSelectCitizen() {
        this.isAdvancedSearching = false;
        this.isAddingCitizen = false;
        this.isAssigning = false;
        this.isQuickSearching = false;
        this.isSelecting = true;
        this.isSearching = false;
    }

    selectCitizen($event) {
        this.store.dispatch(new SuborgActions.SelectCitizen($event));
        this.showAssignPosition();
    }

    updateSearchResults(results: CitizenSearchResult[]) {
        if (results && results.length > 0) {
            this.showSelectCitizen();
            this.citizenSearchResults = _.sortBy(results,
                (res) => `${res.lastName}${res.firstName}${res.middleName}${res.address}`.toLocaleLowerCase());
        }
    }

    updateSelectedCitizen(selectedCitizen: CitizenSearchResult) {
        if (selectedCitizen) {
            this.initCitizen = selectedCitizen;
            this.showAssignPosition();
        }
    }

    updateSelectedPosition(positionToFill: PositionToFill) {
        if (positionToFill) {
            this.selectedPosition = positionToFill;
            this.isPositionSelected = true;
        }
    }

    updateSelectedSuborganization(suborganization: Suborganization) {
        if (suborganization) {
            this.selectedSuborganization = suborganization;
            this.isSuborganizationSelected = true;
        }
    }

}
