/**
 * @author Kent Bull
 */

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {catchError, finalize, tap} from 'rxjs/operators';
import {AllocationReport} from '../models/AllocationReport';
import {AssignmentsService} from './assignments.service';
import * as fromAssignments from '../reducers';
import * as AssignmentActions from '../actions/assignments.actions';
import {LoadingService} from '../../shared/loading.service';

@Injectable()
export class AllocationsResolver implements Resolve<AllocationReport[]> {

    constructor(private assignmentsService: AssignmentsService,
                private store: Store<fromAssignments.State>,
                private loadingService: LoadingService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AllocationReport[]> {
        this.loadingService.setLoading(true)
        return this.assignmentsService.getAccessibleAllocations()
            .pipe(
                tap(allocations => this.store.dispatch(new AssignmentActions.LoadAllocationsSuccess(allocations))),
                catchError(error => {
                    this.store.dispatch(new AssignmentActions.LoadAllocationsFailure(error));
                    return of('any')
                }),
                finalize(() => this.loadingService.setLoading(false))
            )
    }

}
