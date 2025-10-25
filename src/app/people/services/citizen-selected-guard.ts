import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromOrgEvents from '../../organization-events/reducers';
import * as fromPeople from '../reducers';

@Injectable()
export class CitizenSelectedGuard implements CanActivate {

    isCitizenSelected = false;

    constructor(private router: Router,
                private store: Store<fromOrgEvents.State>) {
        store.pipe(
            select(fromPeople.selectSelectedCitizen))
            .subscribe(selectedCitizen => this.isCitizenSelected = !!selectedCitizen )
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.isCitizenSelected;
    }

}
