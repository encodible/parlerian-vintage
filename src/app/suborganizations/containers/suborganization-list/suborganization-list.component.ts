import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Suborganization} from '../../models/suborganization';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import * as fromSuborgs from '../../reducers';
import * as SuborgActions from '../../actions/suborganization.actions';
import {Location} from '@angular/common';

declare const $: any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-suborganization-list',
    templateUrl: './suborganization-list.component.html',
    styleUrls: ['./suborganization-list.component.scss']
})
export class SuborganizationListComponent implements OnInit, AfterViewInit {

    public precinctTableData: DataTable;
    public showResultsTable: true;

    suborganizationList$: Observable<Suborganization[]>;

    constructor(private store: Store<fromSuborgs.State>,
                private location: Location) {
        this.suborganizationList$ = store.pipe(
            select(fromSuborgs.getAccessibleSuborganizations)
        )
        this.precinctTableData = {
            headerRow: [
                'Category', 'Name', 'Description'],
            footerRow: [
                'Category', 'Name', 'Description'],
            dataRows: []
        };
    }

    back() {
        this.location.back();
    }

    ngAfterViewInit() {
        $('#precinctsTable').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [
                [10, 25, 50, -1],
                [10, 25, 50, 'All']
            ],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search records',
            }

        });

    }

    ngOnInit() {
        this.precinctTableData = {
            headerRow: [
                'Category', 'Name', 'Description'],
            footerRow: [
                'Category', 'Name', 'Description'],
            dataRows: []
        };
    }

    selectSuborganization(suborg: Suborganization) {
        this.store.dispatch(new SuborgActions.SelectSuborganization(suborg))
    }

}
