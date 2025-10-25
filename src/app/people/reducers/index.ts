import * as fromCitizens from './citizens.reducer';
import * as fromRoot from '../../reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface CitizensState {
    citizens: fromCitizens.State
}

export interface State extends fromRoot.State {
    citizens: CitizensState
}


export const reducers: ActionReducerMap<CitizensState> = {
    citizens: fromCitizens.reducer
};


// Selectors
export const getCitizensState = createFeatureSelector<CitizensState>('citizens');
export const getCitizens = createSelector(
    getCitizensState,
    state => state.citizens
);
export const selectSearchResults = createSelector(
    getCitizens,
    citizens => citizens.searchResults
);
export const selectSelectedCitizen = createSelector(
    getCitizens,
    citizens => citizens.selectedCitizen
);

