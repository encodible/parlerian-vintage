import * as fromSuborganizations from './suborganizations.reducer';
import * as fromRoot from '../../reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface SuborganizationsState {
    suborganizations: fromSuborganizations.State
}

export interface State extends fromRoot.State {
    suborganizations: SuborganizationsState
}


export const reducers: ActionReducerMap<SuborganizationsState> = {
    suborganizations: fromSuborganizations.reducer
};


// Selectors
export const getSuborgsStateFeature = createFeatureSelector<SuborganizationsState>('suborganizations');
export const getSuborgsState = createSelector(
    getSuborgsStateFeature,
    state => state.suborganizations
);


export const getAccessibleSuborganizations = createSelector(
    getSuborgsState,
    fromSuborganizations.getAccessibleSuborgs
);

export const getSelectedSuborg = createSelector(
    getSuborgsState,
    state => state.selectedSuborganization
);


