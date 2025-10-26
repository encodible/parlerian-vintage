import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {select, Store} from '@ngrx/store';
import * as fromPeople from '../../reducers';
import {Observable, Subscription} from 'rxjs';
import {CitizenSearchResult} from '../../services/citizen-api.service';
import {Location} from '@angular/common';
import * as CitizenActions from '../../actions/citizens.actions';

declare const $: any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss'],
    standalone: true,
    imports: [CommonModule, MatButtonModule]
})
export class PeopleListComponent implements OnInit, AfterViewInit, OnDestroy {

    public peopleTableData: DataTable;
    public showResultsTable = true;
    private subscriptions: Subscription[] = [];

    public searchResults$: Observable<CitizenSearchResult[]>;

    constructor(private store: Store<fromPeople.State>,
                private location: Location,
                private zone: NgZone) {
        this.peopleTableData = {
            headerRow: [
                'First Name', 'Last Name', 'Affiliation', 'Actions'],
            footerRow: [
                'First Name', 'Last Name', 'Affiliation', 'Actions'],

            dataRows: []
        };
        this.searchResults$ = store.pipe(
            select(fromPeople.selectSearchResults));
        this.subscriptions.push(store.pipe(
            select(fromPeople.selectSearchResults))
            .subscribe(results => this.showResultsTable = results.length > 0))
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    ngOnInit() {
        this.peopleTableData = {
            headerRow: [
                'First Name', 'Last Name', 'Affiliation', 'Address', 'SH', 'SS', 'C', 'Precinct', 'Actions'],
            footerRow: [
                'First Name', 'Last Name', 'Affiliation', 'Address', 'SH', 'SS', 'C', 'Precinct', 'Actions'],
            dataRows: []
        };
    }


    ngAfterViewInit() {
        $('#peopleTable').DataTable({
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

    back() {
        this.location.back();
    }

    selectCitizen(citizen: CitizenSearchResult) {
        this.store.dispatch(new CitizenActions.SelectCitizen(citizen))
    }

    updatePeopleTableData(results: CitizenSearchResult[]) {
        this.peopleTableData.dataRows = results.map(result => {
            return [result.firstName,
                result.lastName,
                result.affiliation];
        });
    }


}
