/**
 * @author Kent Bull
 */

import {Action} from '@ngrx/store';
import {EventCreationResponse, EventInfo, OrganizationEvent} from '../models/OrganizationEvent';
import {Attendee} from '../models/Attendee';

export enum EventActionTypes {
    DeselectEvent = '[Events] Deselect Event',
    EventCreated = '[Events] Event Created',
    LoadAttendeesFailure = '[Events] Load Attendees Failure',
    LoadAttendeesSuccess = '[Events] Load Attendees Success',
    LoadEventListFailure = '[Events] Load Event List Failure',
    LoadEventListSuccess = '[Events] Load Event List Success',
    SelectEvent = '[Events] Select Event',
    NavToEventDetail = '[Events] Navigate to Event Detail',
    NavToEventList = '[Events] Navigate to Event List'
}


export class DeselectEvent implements Action {
    readonly type = EventActionTypes.DeselectEvent;

    constructor(public payload?: any) {
    }
}

export class EventCreated implements Action {
    readonly type = EventActionTypes.EventCreated;

    constructor(public payload: EventCreationResponse) {
    }
}


export class LoadAttendeesFailure implements Action {
    readonly type = EventActionTypes.LoadAttendeesFailure;

    constructor(public payload?: any) {
    }
}


export class LoadAttendeesSuccess implements Action {
    readonly type = EventActionTypes.LoadAttendeesSuccess;

    constructor(public payload: Attendee[]) {
    }
}


export class LoadEventListFailure implements Action {
    readonly type = EventActionTypes.LoadEventListFailure;

    constructor(public payload: any) {
    }
}


export class LoadEventListSuccess implements Action {
    readonly type = EventActionTypes.LoadEventListSuccess;

    constructor(public payload: EventInfo[]) {
    }
}


export class NavToEventDetail implements Action {
    readonly type = EventActionTypes.NavToEventDetail;

    // payload is organization event id
    constructor(public payload: number) {
    }
}


export class NavToEventList implements Action {
    readonly type = EventActionTypes.NavToEventList;

    constructor(public payload ?: any) {
    }
}


export class SelectEvent implements Action {
    readonly type = EventActionTypes.SelectEvent;

    constructor(public payload: OrganizationEvent) {
    }
}


export type EventActionsUnion =
    | DeselectEvent
    | EventCreated
    | LoadAttendeesFailure
    | LoadAttendeesSuccess
    | LoadEventListFailure
    | LoadEventListSuccess
    | NavToEventDetail
    | NavToEventList
    | SelectEvent;
