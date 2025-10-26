import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {select, Store} from '@ngrx/store';
import {PositionAssignment} from '../../models/PositionAssignment';
import * as fromAssignments from '../../reducers/index';
import {Observable} from 'rxjs';
import {AssignmentListComponent} from '../../components/assignment-list/assignment-list.component';

@Component({
  selector: 'app-accessible-positions-container',
  templateUrl: './accessible-positions-container.component.html',
  styleUrls: ['./accessible-positions-container.component.scss'],
  standalone: true,
  imports: [CommonModule, AssignmentListComponent]
})
export class AccessiblePositionsContainerComponent implements OnInit {

    public positionAssignments$: Observable<PositionAssignment[]>;

    constructor(private store: Store<fromAssignments.State>) {
        this.positionAssignments$ = store.pipe(
            select(fromAssignments.getAclAssignments)
        ) as Observable<PositionAssignment[]>;
    }

  ngOnInit() {
  }

}
