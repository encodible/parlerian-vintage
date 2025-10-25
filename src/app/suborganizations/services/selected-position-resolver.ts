import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {SuborganizationService} from './suborganization.service';
import {FillablePositions, PositionToFill} from '../../assignments/positions';
import * as fromSuborgs from '../reducers';
import * as suborgActions from '../actions/suborganization.actions';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import {LoadingService} from '../../shared/loading.service';

@Injectable()
export class SelectedPositionResolver implements Resolve<PositionToFill> {

    private allocations: PositionToFill[];

    constructor(private suborganizationService: SuborganizationService,
                private store: Store<fromSuborgs.State>,
                private loadingService: LoadingService) {
        store.pipe(
            select(state => state.suborganizations.suborganizations.suborgFillablePositions.allocations)
        ).subscribe(allocations => this.allocations = allocations);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PositionToFill> {
        const positionId = route.params['positionId'];
        const suborganizationId = route.params['suborganizationId'];
        if (!positionId || !suborganizationId) {
            return of(null);
        } else {
            this.loadingService.setLoading(true)
            return this.suborganizationService.getSuborganizationAllocationByPosition(suborganizationId, positionId)
                .pipe(
                    tap((data: FillablePositions) => {
                        this.store.dispatch(new suborgActions.SelectPosition(data.allocations[0]));
                        this.store.dispatch(new suborgActions.SelectPosition(data.allocations[0]));
                    }),
                    map((data: FillablePositions) => data.allocations[0]),
                    catchError(() => {
                        return of(null)
                    }),
                    finalize(() => this.loadingService.setLoading(false))
                )
        }
    }
}
