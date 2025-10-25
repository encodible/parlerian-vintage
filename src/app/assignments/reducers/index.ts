import * as fromAssignments from './assignments.reducer';
import * as fromRoot from '../../reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {from} from 'rxjs';


export interface AssignmentsState {
    assignments: fromAssignments.State
}


export interface State extends fromRoot.State {
    assignments: AssignmentsState
}


export const reducers: ActionReducerMap<AssignmentsState> = {
    assignments: fromAssignments.reducer
};


// Selectors
export const getAssignmentsFromRootState = createFeatureSelector<AssignmentsState>('assignments');
export const getAssignmentsState = createSelector(
    getAssignmentsFromRootState,
    state => state.assignments
);

export const getAclAssignments = createSelector(
    getAssignmentsState,
    fromAssignments.getAclAssignments
);

export const getAllocations = createSelector(
    getAssignmentsState,
    fromAssignments.getAllocations
);
