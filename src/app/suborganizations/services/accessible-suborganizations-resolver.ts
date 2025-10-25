import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {catchError, finalize, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {Suborganization, suborgAuthzToSuborg} from '../models/suborganization';
import {SuborganizationService} from './suborganization.service';
import * as SuborganizationActions from '../actions/suborganization.actions';
import * as fromSuborgs from '../reducers';
import * as _ from 'lodash';
import {LoadingService} from '../../shared/loading.service';

@Injectable()
export class AccessibleSuborganizationsResolver implements Resolve<Suborganization[]> {

    constructor(private suborganizationService: SuborganizationService,
                private store: Store<fromSuborgs.State>,
                private loadingService: LoadingService) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        this.loadingService.setLoading(true)
        return this.suborganizationService.getSuborganizations()
            .pipe(
                tap(suborgAuthz => {
                    this.store.dispatch(new SuborganizationActions.GetSuborganizationAuthorizationsSuccess(suborgAuthz));
                    this.store.dispatch(new SuborganizationActions.LoadACLSuborgsSuccess(
                        _.uniqBy(suborgAuthz.map(suborgAuthzToSuborg), (e: Suborganization) => e.id)))
                }),
                catchError(error => {
                    this.store.dispatch(new SuborganizationActions.LoadACLSuborgsFailure(error));
                    return of('any')
                }),
                finalize(() => this.loadingService.setLoading(false))
            );
    }
}
