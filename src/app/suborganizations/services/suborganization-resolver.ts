import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SuborganizationService} from './suborganization.service';
import {Store} from '@ngrx/store';
import * as fromAssignments from '../../assignments/reducers';
import {Observable, of} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import * as SuborgActions from '../actions/suborganization.actions';
import {Suborganization} from '../models/suborganization';
import {LoadingService} from '../../shared/loading.service';

@Injectable()
export class SuborganizationResolver implements Resolve<Suborganization> {

    constructor(private suborganizationService: SuborganizationService,
                private store: Store<fromAssignments.State>,
                private loadingService: LoadingService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Suborganization> {
        this.loadingService.setLoading(true)
        return this.suborganizationService.getSuborganization(
            route.params['id'])
            .pipe(
                tap((data: Suborganization) => {
                    this.store.dispatch(new SuborgActions.GetSuborganizationSuccess(data));
                }),
                // switchMap((data:FillablePositions) => data),
                catchError((err: any) => {
                    this.store.dispatch(new SuborgActions.GetSuborganizationFailure(err));
                    return of(null)
                }),
                finalize(() => this.loadingService.setLoading(false))
            );
    }
}
