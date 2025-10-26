import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventInfo} from '../../models/OrganizationEvent';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromEvents from '../../reducers';
import * as EventActions from '../../actions/organization-events.actions';
import {EventListComponent} from '../../components/event-list/event-list.component';
import {EventCalendarComponent} from '../../components/event-calendar/event-calendar.component';

@Component({
    selector: 'app-event-list-container',
    templateUrl: './event-list-container.component.html',
    styleUrls: ['./event-list-container.component.scss'],
    standalone: true,
    imports: [CommonModule, EventListComponent, EventCalendarComponent]
})
export class EventListContainerComponent implements OnInit {

    eventList$: Observable<EventInfo[]>;

    constructor(private store: Store<fromEvents.State>) {
        this.eventList$ = store.pipe(
            select(fromEvents.getEventList)
        ) as Observable<EventInfo[]>;
    }

    ngOnInit() {
    }

    selectEvent($event) {
        this.store.dispatch(new EventActions.SelectEvent($event));
        this.store.dispatch(new EventActions.NavToEventDetail($event.id));
    }

}
