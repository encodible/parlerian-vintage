import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Attendee} from '../../models/Attendee';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromEvents from '../../reducers';
import * as EventActionTypes from '../../actions/organization-events.actions';
import {OrganizationEvent} from '../../models/OrganizationEvent';
import {AttendanceListComponent} from '../../components/attendance-list/attendance-list.component';

@Component({
    selector: 'app-attendance-list-container',
    templateUrl: './attendance-list-container.component.html',
    styleUrls: ['./attendance-list-container.component.scss'],
    standalone: true,
    imports: [CommonModule, AttendanceListComponent]
})
export class AttendanceListContainerComponent implements OnInit {

    public attendees$: Observable<Attendee[]>;
    public orgEvent$: Observable<OrganizationEvent>;

    constructor(private store: Store<fromEvents.State>) {
        this.attendees$ = store.pipe(
            select(fromEvents.getAttendeeList)
        ) as Observable<Attendee[]>;
        this.orgEvent$ = store.pipe(
            select(fromEvents.getSelectedEvent)
        ) as Observable<OrganizationEvent>
    }

    ngOnInit() {
    }

    deselectEvent() {
        this.store.dispatch(new EventActionTypes.DeselectEvent());
        this.store.dispatch(new EventActionTypes.NavToEventList());
    }

}
