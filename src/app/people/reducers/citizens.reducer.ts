import {
    CitizenAdvancedSearchForm,
    CitizenQuickSearchForm,
    CitizenSearchResult,
    CitizenChangeForm,
    Citizen, NameSearchForm
} from '../services/citizen-api.service';
import {CitizenActionsUnion, CitizenActionTypes} from '../actions/citizens.actions';

export interface State {
    advancedSearchFormData: CitizenAdvancedSearchForm,
    changeCitizenLoading: boolean,
    changeCitizenError: string,
    changedCitizen: Citizen,
    citizenFormData: CitizenChangeForm,
    nameSearchFormData: NameSearchForm,
    quickSearchFormData: CitizenQuickSearchForm,
    searchLoading: boolean,
    searchError: string,
    searchResults: CitizenSearchResult[],
    selectedCitizen: CitizenSearchResult
}

export const initialState = {
    advancedSearchFormData: null,
    changeCitizenLoading: false,
    changeCitizenError: '',
    changedCitizen: null,
    citizenFormData: null,
    nameSearchFormData: null,
    quickSearchFormData: null,
    searchLoading: false,
    searchError: '',
    searchResults: null,
    selectedCitizen: null
};

export function reducer(state = initialState, action: CitizenActionsUnion) {
    switch (action.type) {
        case CitizenActionTypes.AdvancedSearch:
            return {
                ...state,
                advancedSearchFormData: action.payload,
                searchError: '',
                searchLoading: true,
            };
        case CitizenActionTypes.ChangeCitizenFailure:
            return {
                ...state,
                changeCitizenError: action.payload,
                changeCitizenLoading: false,
                changedCitizen: null,
            };
        case CitizenActionTypes.ChangeCitizenSuccess:
            return {
                ...state,
                changeCitizenError: '',
                changeCitizenLoading: false,
                changedCitizen: action.payload,
                selectedCitizen: null
            };
        case CitizenActionTypes.CitizenChange:
            return {
                ...state,
                changeCitizenError: '',
                changeCitizenLoading: true,
            };
        case CitizenActionTypes.CitizenSearchFailure:
            return {
                ...state,
                citizenFormData: null,
                searchLoading: false,
                searchError: action.payload,
            };
        case CitizenActionTypes.CitizenSearchSuccess:
            return {
                ...state,
                searchResults: action.payload,
                searchError: '',
                searchLoading: false,
            };
        case CitizenActionTypes.DeselectCitizen:
            return {
                ...state,
                selectedCitizen: null,
                citizenFormData: null
            };
        case CitizenActionTypes.NameSearch:
            return {
                ...state,
                nameSearchFormData: action.payload,
                searchError: '',
                searchLoading: true,
            };
        case CitizenActionTypes.QuickSearch:
            return {
                ...state,
                quickSearchFormData: action.payload,
                searchError: '',
                searchLoading: true,
            };
        case CitizenActionTypes.SelectCitizen:
            return {
                ...state,
                selectedCitizen: action.payload
            };
        default:
            return state;
    }
}
