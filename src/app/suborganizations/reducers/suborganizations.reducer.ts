import {Suborganization, SuborganizationAuthorization} from '../models/suborganization';
import {SuborganizationActionsUnion, SuborganizationActionTypes} from '../actions/suborganization.actions';
import * as _ from 'lodash';
import {FillablePositions, PositionToFill} from '../../assignments/positions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PositionAssignment} from '../../assignments/models/PositionAssignment';
import {CitizenSearchResult} from '../../people/services/citizen-api.service';

export interface State {
    accessibleSuborganizations: Suborganization[],
    assignmentSearchResults: PositionAssignment[],
    citizenSearchError: string,
    citizenSearchResults: CitizenSearchResult[],
    selectedCitizen: CitizenSearchResult,
    selectedPosition: PositionToFill,
    selectedSuborganization: Suborganization,
    suborganizationAuthorizations: SuborganizationAuthorization[],
    suborgFillablePositions: FillablePositions,
    suborgAssignments: PositionAssignment[],
}


export const initialState = {
    accessibleSuborganizations: [],
    assignmentSearchResults: [],
    citizenSearchError: '',
    citizenSearchResults: [],
    selectedCitizen: null,
    selectedPosition: null,
    selectedSuborganization: null,
    suborganizationAuthorizations: [],
    suborgFillablePositions: null,
    suborgAssignments: []
};


export function reducer(state = initialState, action: SuborganizationActionsUnion) {
    switch (action.type) {
        case SuborganizationActionTypes.AssignPosition:
            return {
                ...state
            };
        case SuborganizationActionTypes.AssignPositionFailure:
            return {
                ...state,

            };
        case SuborganizationActionTypes.AssignPositionSuccess:
            return {
                ...state,
              citizenSearchResults: [],
              selectedCitizen: null,
            };
        case SuborganizationActionTypes.AssignmentSearchFailure:
            return {
                ...state,
                assignmentSearchResults: []
            }
        case SuborganizationActionTypes.AssignmentSearchSuccess:
            return {
                ...state,
                assignmentSearchResults: action.payload
            }
        case SuborganizationActionTypes.DeselectSuborganization:
            return {
                ...state,
                selectedSuborganization: null
            };
        case SuborganizationActionTypes.GetPositionsToFillBySuborganizationIdFailure:
            return {
                ...state,
                suborgFillablePositions: null
            };
        case SuborganizationActionTypes.GetPositionsToFillBySuborganizationIdSuccess:
            return {
                ...state,
                suborgFillablePositions: action.payload
            };
        case SuborganizationActionTypes.GetSuborganizationFailure:
            return {
                ...state,
                selectedSuborganization: null
            };
        case SuborganizationActionTypes.GetSuborganizationSuccess:
            return {
                ...state,
                selectedSuborganization: action.payload
            };
        case SuborganizationActionTypes.GetSuborganizationAssignmentsFailure:
            return {
                ...state,
                suborgAssignments: []
            };
        case SuborganizationActionTypes.GetSuborganizationAssignmentsSuccess:
            return {
                ...state,
                suborgAssignments: action.payload
            };
        case SuborganizationActionTypes.GetSuborganizationAuthorizationsFailure:
            return {
                ...state,
                suborganizationAuthorizations: []
            };
        case SuborganizationActionTypes.GetSuborganizationAuthorizationsSuccess:
            return {
                ...state,
                suborganizationAuthorizations: action.payload
            };
        case SuborganizationActionTypes.LoadACLSuborgsFailure:
            return {
                ...state,
                accessibleSuborganizations: []
            };
        case SuborganizationActionTypes.LoadACLSuborgsSuccess:
            return {
                ...state,
                accessibleSuborganizations: _.orderBy(action.payload, ['commonName'], ['asc'])
            };
        case SuborganizationActionTypes.AdvancedSearch:
        case SuborganizationActionTypes.QuickSearch:
            return {
                ...state,
                citizenSearchResults: [],
            };
        case SuborganizationActionTypes.AdvancedSearchFailure:
        case SuborganizationActionTypes.QuickSearchFailure:
            return {
                ...state,
                citizenSearchResults: [],
                citizenSearchError: action.payload,
            };
        case SuborganizationActionTypes.AdvancedSearchSuccess:
        case SuborganizationActionTypes.QuickSearchSuccess:
            return {
                ...state,
                citizenSearchResults: action.payload
            };
        case SuborganizationActionTypes.SelectCitizen:
            return {
                ...state,
                selectedCitizen: action.payload
            };
        case SuborganizationActionTypes.SelectPosition:
            return {
                ...state,
                selectedPosition: action.payload
            };
        case SuborganizationActionTypes.SelectSuborganization:
            return {
                ...state,
                selectedSuborganization: action.payload
            };
        default:
            return state;
    }
}

// Selectors
export const getAccessibleSuborgs = (state: State) => state.accessibleSuborganizations;
export const getSuborganizationState = createFeatureSelector<State>('suborganizations');
export const getSuborgFillablePositions = createSelector(
    getSuborganizationState,
    state => {
        if (state.suborgFillablePositions) {
            return state.suborgFillablePositions
        } else {
            return {
                allocationCount: 0,
                allocations: []
            }
        }
    }
);
export const getSuborgAssignments = createSelector(
    getSuborganizationState,
    state => state.suborgAssignments
);
export const getAllocations = createSelector(
    getSuborgFillablePositions,
    state => state.allocations
);
export const getSelectedSuborganization = createSelector(
    getSuborganizationState,
    state => state.selectedSuborganization
);
export const getSelectedPosition = createSelector(
    getSuborganizationState,
    state => state.selectedPosition
);
