import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes} from '../actions/auth.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UaaService} from '../../core';

@Injectable()
export class AuthEffects {

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    @Effect({ dispatch: false })
    loginRedirect$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
        tap(authed => {
            this.authService.logout();
            this.router.navigate(['/login']);
        })
    );

    constructor(
        private actions$: Actions,
        private authService: UaaService,
        private router: Router
    ) {}
}
