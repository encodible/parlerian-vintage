/**
 * @author Kent Bull
 */
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {UaaService} from '../../core';
import {EventActionTypes, NavToEventDetail, NavToEventList} from '../actions/organization-events.actions';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class OrganizationEventsEffects {
    @Effect({dispatch: false})
    navToEventDetail$ = this.actions$.pipe(
        ofType<NavToEventDetail>(EventActionTypes.NavToEventDetail),
        tap(event => {
            this.router.navigate(['/events', event.payload])
        })
    );


    @Effect({dispatch: false})
    navToEventList$ = this.actions$.pipe(
        ofType<NavToEventList>(EventActionTypes.NavToEventList),
        tap(event => {
            this.router.navigate(['/events'])
        })
    );

    constructor(
        private actions$: Actions,
        private authService: UaaService,
        private router: Router
    ) {
    }
}
