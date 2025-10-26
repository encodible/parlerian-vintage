import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {PositionAssignment} from '../../models/PositionAssignment';
import {select, Store} from '@ngrx/store';
import * as fromAssignments from '../../reducers';
import * as fromSuborgs from '../../../suborganizations/reducers/suborganizations.reducer';
import {Observable} from 'rxjs';
import {Suborganization} from '../../../suborganizations/models/suborganization';

@Component({
    selector: 'app-assignments-page',
    templateUrl: './assignments-page.component.html',
    styleUrls: ['./assignments-page.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterOutlet]
})
export class AssignmentsPageComponent implements OnInit {

    public positionAssignments$: Observable<PositionAssignment[]>;
    public selectedSuborganization$: Observable<Suborganization>;

    constructor(private store: Store<fromAssignments.State>) {
        this.positionAssignments$ = store.pipe(
            select(fromAssignments.getAclAssignments)
        ) as Observable<PositionAssignment[]>;
        this.selectedSuborganization$ = store.pipe(
            select(fromSuborgs.getSelectedSuborganization)
        ) as Observable<Suborganization>;
    }

    ngOnInit() {
    }
}
