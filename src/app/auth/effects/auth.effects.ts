import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthActionTypes} from '../actions/auth.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UaaService} from '../../core';

@Injectable()
export class AuthEffects {

    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        tap(() => {
            this.router.navigate(['/']);
        })
    ), { dispatch: false });

    loginRedirect$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
        tap(authed => {
            this.authService.logout();
            this.router.navigate(['/login']);
        })
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private authService: UaaService,
        private router: Router
    ) {}
}
