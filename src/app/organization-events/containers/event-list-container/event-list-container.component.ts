import {Component, OnInit} from '@angular/core';
import {EventInfo} from '../../models/OrganizationEvent';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromEvents from '../../reducers';
import * as EventActions from '../../actions/organization-events.actions';

@Component({
    selector: 'app-event-list-container',
    templateUrl: './event-list-container.component.html',
    styleUrls: ['./event-list-container.component.scss']
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
