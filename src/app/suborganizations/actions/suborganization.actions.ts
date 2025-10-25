/**
 * @author Kent Bull
 */
import {Action} from '@ngrx/store';
import {Suborganization} from '../models/suborganization';
import {FillablePositions, PositionToFill} from '../../assignments/positions';
import {PositionAssignment} from '../../assignments/models/PositionAssignment';
import {
    Citizen,
    CitizenAdvancedSearchForm,
    CitizenChangeForm,
    CitizenQuickSearchForm,
    CitizenSearchResult
} from '../../people/services/citizen-api.service';
import {PositionAssignmentForm, PositionAssignmentResult} from '../../assignments/position-assignments';

export enum SuborganizationActionTypes {
    AddCitizen = '[Suborg] Add Citizen',
    AddCitizenFailure = '[Suborg] Add Citizen Failure',
    AddCitizenSuccess = '[Suborg] Add Citizen Success',
    AdvancedSearch = '[Suborg] Advanced Search',
    AdvancedSearchFailure = '[Suborg] Advanced Search Failure',
    AdvancedSearchSuccess = '[Suborg] Advanced Search Success',
    AssignPosition = '[Suborgs] Assign Position',
    AssignPositionFailure = '[Suborgs] Assign Position Failure',
    AssignPositionSuccess = '[Suborgs] Assign Position Success',
    AssignmentSearchFailure = '[Suborgs] Assignment Search Failure',
    AssignmentSearchSuccess = '[Suborgs] Assignment Search Success',
    DeselectSuborganization = '[Suborgs] Deselect Suborganization',
    DismissPosition = '[Suborgs] Dismiss Position',
    DismissPositionFailure = '[Suborgs] Dismiss Position Failure',
    DismissPositionSuccess = '[Suborgs] Dismiss Position Success',
    GetPositionsToFillBySuborganizationId = '[Suborgs] Get Positions To Fill',
    GetPositionsToFillBySuborganizationIdFailure = '[Suborgs] Get Positions To Fill Failure',
    GetPositionsToFillBySuborganizationIdSuccess = '[Suborgs] Get Positions To Fill Success',
    GetSuborganizationFailure = '[Suborgs] Get Suborganization Failure',
    GetSuborganizationSuccess = '[Suborgs] Get Suborganization Success',
    GetSuborganizationAssignmentsFailure = '[Suborgs] Get Suborganization Assignments Failure',
    GetSuborganizationAssignmentsSuccess = '[Suborgs] Get Suborganization Assignments Success',
    GetSuborganizationAuthorizationsFailure = '[Suborgs] Get Suborganization Authorizations Failure',
    GetSuborganizationAuthorizationsSuccess = '[Suborgs] Get Suborganization Authorizations Success',
    LoadACLSuborgsFailure = '[Suborgs] Load ACL Suborgs Failure',
    LoadACLSuborgsSuccess = '[Suborgs] Load ACL Suborgs Success',
    QuickSearch = '[Suborgs] Quick Search',
    QuickSearchFailure = '[Suborgs] Quick Search Failure',
    QuickSearchSuccess = '[Suborgs] Quick Search Success',
    SelectCitizen = '[Suborg] Select Citizen',
    SelectPosition = '[Suborgs] Select Position',
    SelectSuborganization = '[Suborgs] Select Suborganization',
}

export class AddCitizen implements Action {
    readonly type = SuborganizationActionTypes.AddCitizen;

    constructor(public payload: CitizenChangeForm) {
    }
}

export class AddCitizenFailure implements Action {
    readonly type = SuborganizationActionTypes.AddCitizenFailure;

    constructor(public payload?: any) {
    }
}

export class AddCitizenSuccess implements Action {
    readonly type = SuborganizationActionTypes.AddCitizenSuccess;

    constructor(public payload: Citizen) {
    }
}

export class AdvancedSearch implements Action {
    readonly type = SuborganizationActionTypes.AdvancedSearch;

    constructor(public payload: CitizenAdvancedSearchForm) {
    }
}

export class AdvancedSearchFailure implements Action {
    readonly type = SuborganizationActionTypes.AdvancedSearchFailure;

    constructor(public payload?: any) {
    }
}

export class AdvancedSearchSuccess implements Action {
    readonly type = SuborganizationActionTypes.AdvancedSearchSuccess;

    constructor(public payload: CitizenSearchResult[]) {
    }
}

export class AssignPosition implements Action {
    readonly type = SuborganizationActionTypes.AssignPosition;

    constructor(public payload: PositionAssignmentForm) {
    }
}

export class AssignPositionFailure implements Action {
    readonly type = SuborganizationActionTypes.AssignPositionFailure;

    constructor(public payload?: any) {
    }
}

export class AssignPositionSuccess implements Action {
    readonly type = SuborganizationActionTypes.AssignPositionSuccess;

    constructor(public payload: PositionAssignmentResult) {
    }
}

export class AssignmentSearchFailure implements Action {
    readonly type = SuborganizationActionTypes.AssignmentSearchFailure;

    constructor(public payload?: any) {
    }
}

export class AssignmentSearchSuccess implements Action {
    readonly type = SuborganizationActionTypes.AssignmentSearchSuccess;

    constructor(public payload: PositionAssignment[]) {
    }
}

export class DeselectSuborganization implements Action {
    readonly type = SuborganizationActionTypes.DeselectSuborganization;

    constructor(public payload?: any) {
    }
}

export class DismissPosition implements Action {
    readonly type = SuborganizationActionTypes.DismissPosition;

    constructor(public payload: PositionAssignment) {
    }
}

export class DismissPositionFailure implements Action {
    readonly type = SuborganizationActionTypes.DismissPositionFailure;

    constructor(public payload?: any) {
    }
}

export class DismissPositionSuccess implements Action {
    readonly type = SuborganizationActionTypes.DismissPositionSuccess;

    constructor(public payload?: any) {
    }
}

export class GetPositionsToFillBySuborganizationId implements Action {
    readonly type = SuborganizationActionTypes.GetPositionsToFillBySuborganizationId;

    constructor(public payload: Suborganization) {
    }
}

export class GetPositionsToFillBySuborganizationIdFailure implements Action {
    readonly type = SuborganizationActionTypes.GetPositionsToFillBySuborganizationIdFailure;

    constructor(public payload?: any) {
    }
}

export class GetPositionsToFillBySuborganizationIdSuccess implements Action {
    readonly type = SuborganizationActionTypes.GetPositionsToFillBySuborganizationIdSuccess;

    constructor(public payload: FillablePositions) {
    }
}

export class GetSuborganizationFailure implements Action {
    readonly type = SuborganizationActionTypes.GetSuborganizationFailure;

    constructor(public payload?: any) {
    }
}

export class GetSuborganizationSuccess implements Action {
    readonly type = SuborganizationActionTypes.GetSuborganizationSuccess;

    constructor(public payload: Suborganization) {
    }
}

export class GetSuborganizationAssignmentsFailure implements Action {
    readonly type = SuborganizationActionTypes.GetSuborganizationAssignmentsFailure;

    constructor(public payload?: any) {
    }
}

export class GetSuborganizationAssignmentsSuccess implements Action {
    readonly type = SuborganizationActionTypes.GetSuborganizationAssignmentsSuccess;

    constructor(public payload: PositionAssignment[]) {
    }
}

export class GetSuborganizationAuthorizationsFailure implements Action {
    readonly type = SuborganizationActionTypes.GetSuborganizationAuthorizationsFailure;

    constructor(public payload: any) {
    }
}

export class GetSuborganizationAuthorizationsSuccess implements Action {
    readonly type = SuborganizationActionTypes.GetSuborganizationAuthorizationsSuccess;

    constructor(public payload: any) {
    }
}

export class LoadACLSuborgsFailure implements Action {
    readonly type = SuborganizationActionTypes.LoadACLSuborgsFailure;

    constructor(public payload: any) {
    }
}


export class LoadACLSuborgsSuccess implements Action {
    readonly type = SuborganizationActionTypes.LoadACLSuborgsSuccess;

    constructor(public payload: Suborganization[]) {
    }
}

export class QuickSearch implements Action {
    readonly type = SuborganizationActionTypes.QuickSearch;

    constructor(public payload: CitizenQuickSearchForm) {
    }
}

export class QuickSearchFailure implements Action {
    readonly type = SuborganizationActionTypes.QuickSearchFailure;

    constructor(public payload?: any) {
    }
}

export class QuickSearchSuccess implements Action {
    readonly type = SuborganizationActionTypes.QuickSearchSuccess;

    constructor(public payload: CitizenSearchResult[]) {
    }
}

export class SelectCitizen implements Action {
    readonly type = SuborganizationActionTypes.SelectCitizen;

    constructor(public payload: CitizenSearchResult) {
    }
}

export class SelectPosition implements Action {
    readonly type = SuborganizationActionTypes.SelectPosition;

    constructor(public payload: PositionToFill) {
    }
}

export class SelectSuborganization implements Action {
    readonly type = SuborganizationActionTypes.SelectSuborganization;

    constructor(public payload: Suborganization) {
    }
}


export type SuborganizationActionsUnion =
    AddCitizen
    | AddCitizenFailure
    | AddCitizenSuccess
    | AdvancedSearch
    | AdvancedSearchFailure
    | AdvancedSearchSuccess
    | AssignPosition
    | AssignPositionFailure
    | AssignPositionSuccess
    | AssignmentSearchFailure
    | AssignmentSearchSuccess
    | DeselectSuborganization
    | DismissPosition
    | DismissPositionFailure
    | DismissPositionSuccess
    | GetPositionsToFillBySuborganizationId
    | GetPositionsToFillBySuborganizationIdFailure
    | GetPositionsToFillBySuborganizationIdSuccess
    | GetSuborganizationFailure
    | GetSuborganizationSuccess
    | GetSuborganizationAssignmentsFailure
    | GetSuborganizationAssignmentsSuccess
    | GetSuborganizationAuthorizationsFailure
    | GetSuborganizationAuthorizationsSuccess
    | LoadACLSuborgsFailure
    | LoadACLSuborgsSuccess
    | QuickSearch
    | QuickSearchFailure
    | QuickSearchSuccess
    | SelectCitizen
    | SelectPosition
    | SelectSuborganization;
