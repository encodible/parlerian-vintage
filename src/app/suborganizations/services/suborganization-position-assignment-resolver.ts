import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PositionAssignment} from '../../assignments/models/PositionAssignment';
import {SuborganizationService} from './suborganization.service';
import {Store} from '@ngrx/store';
import * as fromAssignments from '../../assignments/reducers';
import {Observable, of} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import * as SuborgActions from '../actions/suborganization.actions';
import {LoadingService} from '../../shared/loading.service';

@Injectable()
export class SuborganizationPositionAssignmentResolver implements Resolve<PositionAssignment[]> {

    constructor(private suborganizationService: SuborganizationService,
                private store: Store<fromAssignments.State>,
                private loadingService: LoadingService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PositionAssignment[]> {
        this.loadingService.setLoading(true)
        return this.suborganizationService.getSuborganizationAssignmentsByPosition(
            route.params['suborganizationId'], route.params['positionId'])
            .pipe(
                tap((data: PositionAssignment[]) => {
                    this.store.dispatch(new SuborgActions.GetSuborganizationAssignmentsSuccess(data));
                }),
                catchError((err: any) => {
                    this.store.dispatch(new SuborgActions.GetSuborganizationAssignmentsFailure(err));
                    return of(null)
                }),
                finalize(() => this.loadingService.setLoading(false))
            );
    }
}