import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {PositionAssignment} from '../models/PositionAssignment';
import {AssignmentsService} from './assignments.service';
import * as fromAssignments from '../reducers';
import * as AssignmentActions from '../actions/assignments.actions';
import {LoadingService} from '../../shared/loading.service';


@Injectable()
export class AssignmentsResolver implements Resolve<PositionAssignment[]> {

    constructor(private assignmentsService: AssignmentsService,
                private store: Store<fromAssignments.State>,
                private loadingService: LoadingService) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PositionAssignment[]> {
        this.loadingService.setLoading(true)
        return this.assignmentsService.getAccessibleAssignments()
            .pipe(
                tap(assignments => this.store.dispatch(new AssignmentActions.LoadACLAssignmentsSuccess(assignments))),
                catchError(error => {
                    this.store.dispatch(new AssignmentActions.LoadACLAssignmentsFailure(error));
                    return of('any')
                }),
                finalize(() => this.loadingService.setLoading(false))
            )
    }

}
