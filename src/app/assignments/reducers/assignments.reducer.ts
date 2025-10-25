/**
 * @author Kent Bull
 */
import {PositionAssignment} from '../models/PositionAssignment';
import {AssignmentActionTypes, AssignmentsActionsUnion} from '../actions/assignments.actions';
import {AllocationReport} from '../models/AllocationReport';

export interface State {
    aclAssignments: PositionAssignment[],
    allocations: AllocationReport[]
}


export const initialState = {
    aclAssignments: [],
    allocations: []
};


export function reducer(state = initialState, action: AssignmentsActionsUnion) {
    switch (action.type) {
        case AssignmentActionTypes.LoadACLAssignmentsFailure: {
            return {
                ...state,
                aclAssignments: []
            }
        }
        case AssignmentActionTypes.LoadACLAssignmentsSuccess: {
            return {
                ...state,
                aclAssignments: action.payload
            }
        }
        case AssignmentActionTypes.LoadAllocationsFailure: {
            return {
                ...state,
                allocations: []
            }
        }
        case AssignmentActionTypes.LoadAllocationsSuccess: {
            return {
                ...state,
                allocations: action.payload
            }
        }
        default:
            return state;
    }
}


// Selectors
export const getAclAssignments = (state: State) => state.aclAssignments;
export const getAllocations = (state: State) => state.allocations;
