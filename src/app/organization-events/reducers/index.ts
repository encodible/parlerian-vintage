import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromOrganizationEvents from './organization-events.reducer'
import * as fromRoot from '../../reducers';

export interface OrganizationEventsState {
    organizationEvents: fromOrganizationEvents.State
}

export interface State extends fromRoot.State {
    organizationEvents: OrganizationEventsState
}

export const reducers: ActionReducerMap<OrganizationEventsState> = {
    organizationEvents: fromOrganizationEvents.reducer
};


// Selectors
export const getOrgEventsState = createFeatureSelector<OrganizationEventsState>('organization-events');
export const getEventEntitiesState = createSelector(
    getOrgEventsState,
    state => state.organizationEvents
);
export const getEventList = createSelector(
    getEventEntitiesState,
    fromOrganizationEvents.getEventList
);
export const getAttendeeList = createSelector(
    getEventEntitiesState,
    fromOrganizationEvents.getAttendeeList
);
export const getSelectedEvent = createSelector(
    getEventEntitiesState,
    fromOrganizationEvents.getSelectedEvent
);

