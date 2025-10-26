import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as _ from 'lodash';

import {AssignmentSimpleListComponent} from '../../../assignments/assignment-simple-list/assignment-simple-list.component';
import {PositionToFill} from '../../../assignments/positions';
import * as fromSuborgs from '../../reducers';
import * as SuborgActions from '../../actions/suborganization.actions';
import {Suborganization} from '../../models/suborganization';
import {PositionAssignment} from '../../../assignments/models/PositionAssignment';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AssignmentsService} from '../../../assignments/services/assignments.service';

@Component({
    selector: 'app-suborg-assigned-positions',
    templateUrl: './suborg-assigned-positions.component.html',
    styleUrls: ['./suborg-assigned-positions.component.scss'],
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatTooltipModule, AssignmentSimpleListComponent]
})
export class SuborgAssignedPositionsComponent implements OnInit, OnDestroy {

    selectedPosition: PositionToFill = null;
    selectedSuborganization: Suborganization = null;
    filteredAssignments: PositionAssignment[] = [];

    subscriptions: Subscription[] = [];

    constructor(private store: Store<fromSuborgs.State>,
                private router: Router,
                private route: ActivatedRoute,
                private assignmentsService: AssignmentsService,
                private location: Location) {
        this.subscriptions.push(store.pipe(
            select(state => state.suborganizations.suborganizations.selectedPosition)
        ).subscribe(this.updateSelectedPosition.bind(this)));
        this.subscriptions.push(store.pipe(
            select(state => state.suborganizations.suborganizations.selectedSuborganization)
        ).subscribe(this.updateSelectedSuborganization.bind(this)));
        this.subscriptions.push(store.pipe(
            select(state => state.suborganizations.suborganizations.suborgAssignments)
        ).subscribe(this.updateFilteredAssignments.bind(this)))
    }

    back() {
        this.location.back();
    }

    editAssignment(assignment) {
        this.assignmentsService.updateAssignmentData(assignment);
        this.router.navigate([`/assignments/edit/${assignment.positionAssignmentId}`]);
    }

    dismissPosition(assignment: PositionAssignment) {
        console.log(`Dismissing ${JSON.stringify(assignment, null, 2)}`);
        this.store.dispatch(new SuborgActions.DismissPosition(assignment))
        this.location.back()
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    ngOnInit() {
    }

    updateFilteredAssignments(assignments: PositionAssignment[]) {
        if (this.selectedPosition && assignments) {
            this.filteredAssignments = _.filter(assignments,
                (assignment: PositionAssignment) => assignment.positionId === this.selectedPosition.positionId)
        }
    }

    updateSelectedPosition(pos: PositionToFill) {
        if (pos) {
            this.selectedPosition = pos;
        }
    }

    updateSelectedSuborganization(sub: Suborganization) {
        if (sub) {
            this.selectedSuborganization = sub;
        }
    }
}
