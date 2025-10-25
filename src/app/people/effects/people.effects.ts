import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as CitizenActions from '../actions/citizens.actions';
import {ChangeCitizenFailure, ChangeCitizenSuccess, CitizenSearchFailure, CitizenSearchSuccess} from '../actions/citizens.actions';
import {catchError, exhaustMap, finalize, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {CitizenApi, CitizenChangeForm, CitizenSearchResult} from '../services/citizen-api.service';
import {Router} from '@angular/router';
import {LoadingService} from '../../shared/loading.service';


@Injectable()
export class PeopleEffects {

    @Effect()
    quickSearch$ = this.actions$.pipe(
        ofType<CitizenActions.QuickSearch>(CitizenActions.CitizenActionTypes.QuickSearch),
        map(action => action.payload),
        exhaustMap(quickSearchForm => {
            this.loadingService.setLoading(true)
            return this.citizenApi.citizenQuickSearch(
                quickSearchForm.firstThree,
                quickSearchForm.houseNumber)
                .pipe(
                    mergeMap(searchResults => [
                        new CitizenSearchSuccess(searchResults)
                    ]),
                    catchError(error => of(new CitizenSearchFailure(error))),
                    finalize(() => this.loadingService.setLoading(false))
                );
        })
    );

    @Effect()
    nameSearch = this.actions$.pipe(
        ofType<CitizenActions.NameSearch>(CitizenActions.CitizenActionTypes.NameSearch),
        map(action => action.payload),
        exhaustMap(nameSearchForm => {
            this.loadingService.setLoading(true)
            return this.citizenApi.nameSearch(
                nameSearchForm.firstName,
                nameSearchForm.lastName)
                .pipe(
                    mergeMap(searchResults => [
                        new CitizenSearchSuccess(searchResults)
                    ]),
                    catchError(error => of(new CitizenSearchFailure(error))),
                    finalize(() => this.loadingService.setLoading(false))
                );
        })
    );

    @Effect()
    advancedSearch$ = this.actions$.pipe(
        ofType<CitizenActions.AdvancedSearch>(CitizenActions.CitizenActionTypes.AdvancedSearch),
        map(action => action.payload),
        exhaustMap(advancedSearchForm => {
            this.loadingService.setLoading(true)
            return this.citizenApi.citizenAdvancedSearch(
                advancedSearchForm)
                .pipe(
                    mergeMap(searchResults => [
                        new CitizenSearchSuccess(searchResults)
                    ]),
                    catchError(error => of(new CitizenSearchFailure(error))),
                    finalize(() => this.loadingService.setLoading(false))
                );
        })
    );

    @Effect()
    citizenChange$ = this.actions$.pipe(
        ofType<CitizenActions.CitizenChange>(CitizenActions.CitizenActionTypes.CitizenChange),
        map(action => action.payload),
        exhaustMap((citizenForm: CitizenChangeForm) => {
            this.loadingService.setLoading(true)
            return this.citizenApi.createCitizen(citizenForm)
                .pipe(
                    mergeMap(changedCitizen => {
                        this.router.navigate(['/people']);
                        return [
                            new ChangeCitizenSuccess(changedCitizen.citizenData)
                        ]
                    }),
                    catchError(error => of(new ChangeCitizenFailure(error))),
                    finalize(() => this.loadingService.setLoading(false))
                )
        })
    );

    @Effect({dispatch: false})
    navToUpdateCitizen$ = this.actions$.pipe(
        ofType<CitizenActions.SelectCitizen>(CitizenActions.CitizenActionTypes.SelectCitizen),
        map(action => action.payload),
        tap((selectedCitizen: CitizenSearchResult) =>
            this.router.navigate(['/people', selectedCitizen.stateVoterId, { isUpdating: 'true' } ]))
    );

    @Effect({dispatch: false})
    navToSearchList$ = this.actions$.pipe(
        ofType<CitizenActions.CitizenSearchSuccess>(CitizenActions.CitizenActionTypes.CitizenSearchSuccess),
        tap(() => {
            this.router.navigate(['/people/list'])
        }),
    );

    constructor(
        private actions$: Actions,
        private citizenApi: CitizenApi,
        private router: Router,
        private loadingService: LoadingService
    ) {
    }

}
