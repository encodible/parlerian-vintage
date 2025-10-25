import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromPeople from '../reducers';

@Injectable()
export class SearchResultGuard implements CanActivate {

    private hasResults = false;

    constructor(private router: Router,
                private store: Store<fromPeople.State>) {
        store.pipe(
            select(fromPeople.selectSearchResults))
            .subscribe(results => this.hasResults = results && results.length >= 0)
    }


    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (this.hasResults) {
            return true;
        }
        this.router.navigate(['/people'], {queryParams: {returnUrl: state.url}});
        return true;
    }
}