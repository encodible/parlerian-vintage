import * as _ from 'lodash';
import {EventInfo, OrganizationEvent} from '../models/OrganizationEvent';
import {Attendee} from '../models/Attendee';
import {EventActionsUnion, EventActionTypes} from '../actions/organization-events.actions';

export interface State {
    eventList: EventInfo[],
    attendee: Attendee,
    attendeeList: Attendee[],
    attendeeCount: number,
    selectedEvent: OrganizationEvent
}

export const initialState = {
    eventList: [],
    attendee: null,
    attendeeList: [],
    attendeeCount: 0,
    selectedEvent: null
};


export function reducer(state = initialState, action: EventActionsUnion) {
    switch (action.type) {
        case EventActionTypes.DeselectEvent: {
            return {
                ...state,
                selectedEvent: null
            }
        }
        case EventActionTypes.EventCreated:
            console.dir(state.eventList)
            return {
                ...state,
                eventList: _.orderBy([...state.eventList].concat([action.payload.data]), ['startTime'], ['desc'])
            }
        case EventActionTypes.LoadAttendeesFailure: {
            return {
                ...state,
                attendeeCount: 0,
                attendeeList: []
            }
        }
        case EventActionTypes.LoadAttendeesSuccess: {
            return {
                ...state,
                attendeeCount: action.payload.length,
                attendeeList: action.payload
            }
        }
        case EventActionTypes.LoadEventListFailure: {
            return {
                ...state,
                eventList: []
            }
        }
        case EventActionTypes.LoadEventListSuccess: {
            return {
                ...state,
                eventList: action.payload
            }
        }
        case EventActionTypes.SelectEvent: {
            return {
                ...state,
                selectedEvent: action.payload
            }
        }
        default: {
            return state;
        }
    }
}


// Selectors
export const getEventList = (state: State) => state.eventList;
export const getAttendeeList = (state: State) => state.attendeeList;
export const getSelectedEvent = (state: State) => state.selectedEvent;
