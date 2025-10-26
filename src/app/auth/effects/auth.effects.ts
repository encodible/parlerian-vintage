import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthActionTypes} from '../actions/auth.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UaaService} from '../../core';

@Injectable()
export class AuthEffects {
    // Make services public for testing
    public readonly actions$ = inject(Actions);
    public readonly authService = inject(UaaService);
    public readonly router = inject(Router);

    constructor() {
        // Debug: Check if actions$ is properly injected
        console.log('AuthEffects constructor - actions$:', this.actions$);
    }

    loginSuccess$ = createEffect(() => {
        console.log('Creating loginSuccess$ effect');
        return this.actions$.pipe(
            ofType(AuthActionTypes.LoginSuccess),
            tap(() => {
                console.log('LoginSuccess effect triggered');
                this.router.navigate(['/']);
            })
        );
    }, { dispatch: false });

    loginRedirect$ = createEffect(() => {
        console.log('Creating loginRedirect$ effect');
        return this.actions$.pipe(
            ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
            tap(() => {
                console.log('LoginRedirect effect triggered');
                this.authService.logout();
                this.router.navigate(['/login']);
            })
        );
    }, { dispatch: false });
}
