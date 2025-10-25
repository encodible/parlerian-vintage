/**
 * @author Kent Bull
 */
import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {UaaService} from '../../core';
import {EventActionTypes, NavToEventDetail, NavToEventList} from '../actions/organization-events.actions';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class OrganizationEventsEffects {
    // Make services public for testing
    public readonly actions$ = inject(Actions);
    public readonly authService = inject(UaaService);
    public readonly router = inject(Router);

    navToEventDetail$ = createEffect(() => this.actions$.pipe(
        ofType<NavToEventDetail>(EventActionTypes.NavToEventDetail),
        tap(event => {
            this.router.navigate(['/events', event.payload])
        })
    ), { dispatch: false });


    navToEventList$ = createEffect(() => this.actions$.pipe(
        ofType<NavToEventList>(EventActionTypes.NavToEventList),
        tap(event => {
            this.router.navigate(['/events'])
        })
    ), { dispatch: false });
}
