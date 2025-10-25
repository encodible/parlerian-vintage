import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromSuborgs from '../../reducers';
import {Observable} from 'rxjs';
import {Suborganization} from '../../models/suborganization';
import {PositionAssignment} from '../../../assignments/models/PositionAssignment';
import {getSuborgAssignments} from '../../reducers/suborganizations.reducer';
import {Router} from '@angular/router';

@Component({
  selector: 'app-suborganization-detail-page',
  templateUrl: './suborganization-detail-page.component.html',
  styleUrls: ['./suborganization-detail-page.component.scss']
})
export class SuborganizationDetailPageComponent implements OnInit {

  suborganization$: Observable<Suborganization>;
  suborgAssignments$: Observable<PositionAssignment[]>;

  constructor(private store: Store<fromSuborgs.State>,
              private router: Router) {
    this.suborganization$ = store.pipe(
        select(fromSuborgs.getSelectedSuborg)
    ) as Observable<Suborganization>;
    this.suborgAssignments$ = store.pipe(
        select(getSuborgAssignments)
    ) as Observable<PositionAssignment[]>;
  }

  ngOnInit() {
  }

}
