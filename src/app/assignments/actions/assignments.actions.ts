import {Action} from '@ngrx/store';
import {PositionAssignment} from '../models/PositionAssignment';
import {AllocationReport} from '../models/AllocationReport';
import {PositionToFill} from '../positions';
import {PositionAssignmentResult} from '../position-assignments';

export enum AssignmentActionTypes {
    AssignPosition = '[Assignments] Assign Position',
    AssignPositionFailure = '[Assignments] Assign Position Failure',
    AssignPositionSuccess = '[Assignments] Assign Position Success',
    LoadACLAssignmentsFailure = '[Assignments] Load ACL Assignments Failure',
    LoadACLAssignmentsSuccess = '[Assignments] Load ACL Assignments Success',
    LoadAllocationsFailure = '[Assignments] Load Allocations Failure',
    LoadAllocationsSuccess = '[Assignments] Load Allocations Success',
    SelectPositionToAssign = '[Assignments] Select Position To Assign',
}

export class AssignPosition implements Action {
    readonly type = AssignmentActionTypes.AssignPosition;

    constructor(public payload: PositionToFill) {
    }
}

export class AssignPositionFailure implements Action {
    readonly type = AssignmentActionTypes.AssignPositionFailure;

    constructor(public payload: any) {
    }
}

export class AssignPositionSuccess implements Action {
    readonly type = AssignmentActionTypes.AssignPositionSuccess;

    constructor(public payload: PositionAssignmentResult) {
    }
}

export class LoadACLAssignmentsFailure implements Action {
    readonly type = AssignmentActionTypes.LoadACLAssignmentsFailure;

    constructor(public payload: any) {
    }
}

export class LoadACLAssignmentsSuccess implements Action {
    readonly type = AssignmentActionTypes.LoadACLAssignmentsSuccess;

    constructor(public payload: PositionAssignment[]) {
    }
}

export class LoadAllocationsFailure implements Action {
    readonly type = AssignmentActionTypes.LoadAllocationsFailure;

    constructor(public payload: any) {
    }
}

export class LoadAllocationsSuccess implements Action {
    readonly type = AssignmentActionTypes.LoadAllocationsSuccess;

    constructor(public payload: AllocationReport[]) {
    }
}


export type AssignmentsActionsUnion =
    | LoadACLAssignmentsFailure
    | LoadACLAssignmentsSuccess
    | LoadAllocationsFailure
    | LoadAllocationsSuccess;
