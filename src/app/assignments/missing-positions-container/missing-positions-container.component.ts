import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {select, Store} from '@ngrx/store';
import * as fromAssignments from '../reducers';
import {Observable} from 'rxjs';
import {AllocationReport} from '../models/AllocationReport';
import {MissingPositionsComponent} from '../components/missing-positions/missing-positions.component';

@Component({
  selector: 'app-missing-positions-container',
  templateUrl: './missing-positions-container.component.html',
  styleUrls: ['./missing-positions-container.component.scss'],
  standalone: true,
  imports: [CommonModule, MissingPositionsComponent]
})
export class MissingPositionsContainerComponent implements OnInit {

    public allocations$: Observable<AllocationReport[]>;

    constructor(private store: Store<fromAssignments.State>) {
        this.allocations$ = store.pipe(
            select(fromAssignments.getAllocations)
        ) as Observable<AllocationReport[]>;
    }

  ngOnInit() {
  }

}
