/**
 * @author Kent Bull
 */

import {Injectable} from '@angular/core';
import {EventInfo} from '../models/OrganizationEvent';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {catchError, finalize, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromEvents from '../reducers';
import * as EventActions from '../actions/organization-events.actions';
import {OrganizationEventsService} from './organization-events.service';
import {LoadingService} from '../../shared/loading.service';

@Injectable()
export class EventListResolver implements Resolve<EventInfo[]> {
    constructor(private organizationEventsService: OrganizationEventsService,
                private store: Store<fromEvents.State>,
                private loadingService: LoadingService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        this.loadingService.setLoading(true)
        return this.organizationEventsService.getOrganizationEvents()
            .pipe(
                tap(
                    data => {
                        this.store.dispatch(new EventActions.LoadEventListSuccess(
                            data
                                .sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime())));
                    }
                ),
                catchError(error => {
                    this.store.dispatch(new EventActions.LoadEventListFailure(error));
                    return of('any')
                }),
                finalize(() => this.loadingService.setLoading(false))
            )

    }
}


