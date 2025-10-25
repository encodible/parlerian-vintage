import {Action} from '@ngrx/store';
import {
    Citizen,
    CitizenAdvancedSearchForm,
    CitizenChangeForm,
    CitizenQuickSearchForm,
    CitizenSearchResult, NameSearchForm
} from '../services/citizen-api.service';

export enum CitizenActionTypes {
    AdvancedSearch = '[Citizens] Advanced Search',
    ChangeCitizenFailure = '[Citizens] Change Citizen Failure',
    ChangeCitizenSuccess = '[Citizens] Change Citizen Success',
    CitizenChange = '[Citizens] Citizen Change',
    CitizenSearchFailure = '[Citizens] Search Failure',
    CitizenSearchSuccess = '[Citizens] Search Success',
    DeselectCitizen = '[Citizens] Deselect Citizen',
    NameSearch = '[Citizens] Name Search',
    NavToSearchResultsList = '[Citizens] Nav To Search Results List',
    QuickSearch = '[Citizens] Quick Search',
    SelectCitizen = '[Citizens] Select Citizen',
}

export class AdvancedSearch implements Action {
    readonly type = CitizenActionTypes.AdvancedSearch;

    constructor(public payload: CitizenAdvancedSearchForm) {
    }
}

export class ChangeCitizenFailure implements Action {
    readonly type = CitizenActionTypes.ChangeCitizenFailure;

    constructor(public payload: any) {
    }
}

export class ChangeCitizenSuccess implements Action {
    readonly type = CitizenActionTypes.ChangeCitizenSuccess;

    constructor(public payload: Citizen) {
    }
}

export class CitizenChange implements Action {
    readonly type = CitizenActionTypes.CitizenChange;

    constructor(public payload: CitizenChangeForm) {
    }
}

export class CitizenSearchFailure implements Action {
    readonly type = CitizenActionTypes.CitizenSearchFailure;

    constructor(public payload?: any) {
    }
}

export class CitizenSearchSuccess implements Action {
    readonly type = CitizenActionTypes.CitizenSearchSuccess;

    constructor(public payload: CitizenSearchResult[]) {
    }
}

export class DeselectCitizen implements Action {
    readonly type = CitizenActionTypes.DeselectCitizen;

    constructor(public payload?: any) {}
}

export class NameSearch implements Action {
    readonly type = CitizenActionTypes.NameSearch;

    constructor(public payload: NameSearchForm) {

    }
}
export class NavToSearchResultsList implements Action {
    readonly type = CitizenActionTypes.NavToSearchResultsList;

    constructor(public payload?: any) {
    }
}

export class QuickSearch implements Action {
    readonly type = CitizenActionTypes.QuickSearch;

    constructor(public payload: CitizenQuickSearchForm) {
    }
}

export class SelectCitizen implements Action {
    readonly type = CitizenActionTypes.SelectCitizen;

    constructor(public payload: CitizenSearchResult) {

    }
}

export type CitizenActionsUnion =
    AdvancedSearch
    | ChangeCitizenFailure
    | ChangeCitizenSuccess
    | CitizenChange
    | CitizenSearchFailure
    | CitizenSearchSuccess
    | DeselectCitizen
    | NameSearch
    | NavToSearchResultsList
    | QuickSearch
    | SelectCitizen;
