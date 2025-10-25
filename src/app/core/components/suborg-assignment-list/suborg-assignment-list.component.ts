import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import * as suborgState from '../../../suborganizations/reducers';
import * as suborgReducer from '../../../suborganizations/reducers/suborganizations.reducer';
import * as suborgActions from '../../../suborganizations/actions/suborganization.actions';
import {PositionToFill} from '../../../assignments/positions';
import {Suborganization} from '../../../suborganizations/models/suborganization';

@Component({
    selector: 'app-suborg-assignment-list',
    templateUrl: './suborg-assignment-list.component.html',
    styleUrls: ['./suborg-assignment-list.component.scss']
})
export class SuborgAssignmentListComponent implements OnInit {

    suborgFillablePositions$: Observable<PositionToFill[]>;
    public selectedSuborganization$: Observable<Suborganization>;

    constructor(private store: Store<suborgState.State>,
                private location: Location,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
        this.suborgFillablePositions$ = store.pipe(
            select(state => state.suborganizations.suborganizations.suborgFillablePositions.allocations)
        ) as Observable<PositionToFill[]>;
        this.selectedSuborganization$ = store.pipe(
            select(state => state.suborganizations.suborganizations.selectedSuborganization)
        ) as Observable<Suborganization>;
    }

    back() {
        this.store.dispatch(new suborgActions.DeselectSuborganization());
        this.router.navigate(['/suborganizations']);
    }

    ngOnInit() {
    }

    selectPositionToAssign(positionToFill: PositionToFill) {
        this.store.dispatch(new suborgActions.SelectPosition(positionToFill));
        this.router.navigate(['./assign-position',
                {
                    positionId: positionToFill.positionId,
                    suborganizationId: positionToFill.suborganizationId
                }],
            {relativeTo: this.activatedRoute})
    }

    viewAssignedPositions(positionToFill: PositionToFill) {
        this.store.dispatch(new suborgActions.SelectPosition(positionToFill));
        this.router.navigate(['./assigned-positions', {
            positionId: positionToFill.positionId,
            suborganizationId: positionToFill.suborganizationId
        }], {relativeTo: this.activatedRoute})
    }

}
