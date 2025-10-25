import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventInfo} from '../../models/OrganizationEvent';
import moment from 'moment';


@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

    _eventList: EventInfo[];
    @Output() selectedEvent = new EventEmitter<EventInfo>();


    @Input()
    set eventList(eventList: EventInfo[]) {
        this._eventList = eventList.map(formatDates);
    }

    constructor() {
    }

    ngOnInit(): void {
    }
    addAttendee(orgEvent) {
        console.log(`adding attendee for event ${JSON.stringify(orgEvent, null, 2)}`);
    }

    selectEvent(orgEvent) {
        this.selectedEvent.emit(orgEvent);
    }

}

function formatDates(eventInfo: EventInfo): EventInfo {
    const tableFormat = 'MMM Do \'YY, h:mm:ss a';
    return {
        state: eventInfo.state,
        endTime: moment(eventInfo.endTime).format(tableFormat),
        startTime: moment(eventInfo.startTime).format(tableFormat),
        attendanceCount: eventInfo.attendanceCount,
        description: eventInfo.description,
        id: eventInfo.id,
        name: eventInfo.name,
        organizationId: eventInfo.organizationId
    }
}
