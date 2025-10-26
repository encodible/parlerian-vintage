import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {SuborganizationService} from '../services/suborganization.service';
import {Store} from '@ngrx/store';
import * as suborgState from '../reducers';
import {AssignmentSearchFailure, AssignmentSearchSuccess} from '../actions/suborganization.actions';
import {catchError, finalize, map} from 'rxjs/operators';
import {PositionAssignment} from '../../assignments/models/PositionAssignment';
import {Router} from '@angular/router';
import {AssignmentsService} from '../../assignments/services/assignments.service';
import * as SuborgActions from '../actions/suborganization.actions';
import {Location} from '@angular/common';
import {QuickSearchComponent} from '../../core/components/quick-search/quick-search.component';
import {NameSearchComponent} from '../../core/components/name-search/name-search.component';
import {AssignmentSimpleListComponent} from '../../assignments/assignment-simple-list/assignment-simple-list.component';

@Component({
    selector: 'app-assignments-search-page',
    templateUrl: './assignments-search-page.component.html',
    styleUrls: ['./assignments-search-page.component.scss'],
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, QuickSearchComponent, NameSearchComponent, AssignmentSimpleListComponent]
})
export class AssignmentsSearchPageComponent implements OnInit {

    quickSearchLoading = false
    nameSearchLoading = false
    searchResults: PositionAssignment[] = []
    showNoResults = false

    constructor(
        private assignmentsService: AssignmentsService,
        private router: Router,
        private suborganizationService: SuborganizationService,
        private store: Store<suborgState.State>,
        private location: Location) {
        this.nameSearchLoading = false
        this.quickSearchLoading = false;
    }

    ngOnInit() {
        this.quickSearchLoading = false;
        this.nameSearchLoading = false
        this.showNoResults = false
    }
    back() {
        this.searchResults = [];
    }

    dismissPosition(assignment) {
        console.log(`Dismissing`, assignment)
        this.store.dispatch(new SuborgActions.DismissPosition(assignment))
        this.router.navigate(['/suborganizations/search'])
        this.searchResults = []
    }

    editPosition(assignment) {
        console.log('editing', assignment)
        this.assignmentsService.updateAssignmentData(assignment);
        this.router.navigate([`/assignments/edit/${assignment.positionAssignmentId}`]);
    }

    quickSearch($event) {
        this.quickSearchLoading = true;
        this.showNoResults = false;
        console.log(`Searching form`, $event)
        this.suborganizationService.searchAssignmentsByQuickSearch($event.firstThree, $event.houseNumber)
            .pipe(
                map(resp => resp.data),
                catchError(err => `Error quick searching: ${JSON.stringify(err)}`),
                finalize(() => this.quickSearchLoading = false)
            )
            .subscribe(
                (results) => this.updateAssignments(results),
                (err) => this.assignmentSearchFailed(err)
            )
    }

    searchAssignments(form) {
        this.nameSearchLoading = true
        this.showNoResults = false
        console.log(`Searching form ${JSON.stringify(form)}`)
        this.suborganizationService.searchAssignmentsByName(form.firstName, form.lastName)
            .pipe(
                map(resp => resp.data),
                catchError(err => `Error searching by assignment: ${JSON.stringify(err)}`),
                finalize(() => this.nameSearchLoading = false)
            )
            .subscribe(
                (results) => this.updateAssignments(results),
                (err) => this.assignmentSearchFailed(err)
            )
    }

    updateAssignments(results) {
        console.log(results)
        this.searchResults = results
        this.showNoResults = this.searchResults.length === 0
        this.store.dispatch(new AssignmentSearchSuccess(results.data))
    }

    assignmentSearchFailed(error) {
        this.showNoResults = false
        this.store.dispatch(new AssignmentSearchFailure(error))
        console.error(`Assignment search failed.`, error)
    }

}
