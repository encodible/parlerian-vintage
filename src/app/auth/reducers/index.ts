import {ActionReducerMap} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromRoot from '../../reducers';

/**
 * @author Kent Bull
 */


export interface AuthState {
    auth: fromAuth.State
}


export interface State extends fromRoot.State {
    auth: AuthState
}


export const reducers: ActionReducerMap<AuthState> = {
    auth: fromAuth.reducer
};

