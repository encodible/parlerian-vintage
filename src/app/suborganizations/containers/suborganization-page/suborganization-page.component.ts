import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import * as fromSuborgs from '../../reducers';
import {Suborganization} from '../../models/suborganization';


@Component({
    selector: 'app-suborganization-page',
    templateUrl: './suborganization-page.component.html',
    styleUrls: ['./suborganization-page.component.scss']
})
export class SuborganizationPageComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];
    public suborganizationList$: Observable<Suborganization[]>;

    constructor(private store: Store<fromSuborgs.State>) {
        this.suborganizationList$ = store.pipe(
            select(fromSuborgs.getAccessibleSuborganizations)
        ) as Observable<Suborganization[]>;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
