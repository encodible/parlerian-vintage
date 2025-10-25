/**
 * @author Kent Bull
 */
import {User} from '../models/User';
import {AuthActionsUnion, AuthActionTypes} from '../actions/auth.actions';

export interface State {
    loggedIn: boolean;
    accessToken: string;
    user: User | null;
}

export const initialState = {
    loggedIn: false,
    accessToken: '',
    user: null
};


export function reducer(state = initialState, action: AuthActionsUnion): State {
    switch (action.type) {
        case AuthActionTypes.LoginSuccess: {
            return {
                ...state,
                loggedIn: true,
                user: action.payload.user,
            };
        }

        case AuthActionTypes.Logout: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}
