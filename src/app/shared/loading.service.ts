import {Injectable} from '@angular/core';
import {Observable, Observer, Subscription} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    loading$: Observable<boolean>
    loadingObs: Observer<boolean>
    loadingSub: Subscription

    constructor() {
        this.loading$ = new Observable<boolean>((observer) => {
            this.loadingObs = observer
        })
        this.loadingSub = this.loading$.subscribe(() => {}) // avoids sub undefined err in case layout isn't initialized
    }

    setLoading(loading: boolean) {
        this.loadingObs.next(loading)
    }

    getLoading$ = () => this.loading$

}
