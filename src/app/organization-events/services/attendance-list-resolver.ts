/**
 * @author Kent Bull
 */
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Attendee} from '../models/Attendee';
import {OrganizationEventsService} from './organization-events.service';
import * as fromOrgEvents from '../reducers';
import * as EventActions from '../actions/organization-events.actions';
import {AttendanceReport} from '../models/AttendanceReport';
import {LoadingService} from '../../shared/loading.service';


@Injectable()
export class AttendanceListResolver implements Resolve<Attendee[]> {

    constructor(private organizationEventsService: OrganizationEventsService,
                private store: Store<fromOrgEvents.State>,
                private loadingService: LoadingService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Attendee[]> {
        this.loadingService.setLoading(true)
        return this.organizationEventsService.getEventAttendees(route.params['id'])
            .pipe(
                tap((data: AttendanceReport) => {
                    this.store.dispatch(new EventActions.LoadAttendeesSuccess(data.attendees));
                }),
                map(data => data.attendees),
                catchError(error => {
                    this.store.dispatch(new EventActions.LoadAttendeesFailure());
                    return of([]);
                }),
                finalize(() => this.loadingService.setLoading(false))
            );
    }

}
