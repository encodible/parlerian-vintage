import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromAssignments from '../../assignments/reducers';
import {Observable, of} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {FillablePositions} from '../../assignments/positions';
import {SuborganizationService} from './suborganization.service';
import * as SuborgActions from '../actions/suborganization.actions';
import {LoadingService} from '../../shared/loading.service';

@Injectable()
export class FillablePositionsResolver implements Resolve<FillablePositions> {

    constructor(private suborganizationService: SuborganizationService,
                private store: Store<fromAssignments.State>,
                private loadingService: LoadingService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FillablePositions> {
        this.loadingService.setLoading(true)
        return this.suborganizationService.getSuborganizationFillablePositions(
            route.params['id'],
            route.params['organizationId'])
            .pipe(
                tap((data: FillablePositions) => {
                    this.store.dispatch(new SuborgActions.GetPositionsToFillBySuborganizationIdSuccess(data));
                }),
                // switchMap((data:FillablePositions) => data),
                catchError((err: any) => {
                    this.store.dispatch(new SuborgActions.GetPositionsToFillBySuborganizationIdFailure(err));
                        return of(null)
                }),
                finalize(() => this.loadingService.setLoading(false))
            )
    }
}
