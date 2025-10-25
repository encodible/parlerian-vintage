import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, exhaustMap, finalize, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import swal from 'sweetalert2';

import * as SuborgActions from '../actions/suborganization.actions';
import {SuborganizationService} from '../services/suborganization.service';
import {FillablePositions} from '../../assignments/positions';
import {CitizenApi, toCitizenSearchResult} from '../../people/services/citizen-api.service';
import {AssignmentsService} from '../../assignments/services/assignments.service';
import {PositionAssignmentResult} from '../../assignments/position-assignments';
import {LoadingService} from '../../shared/loading.service';

@Injectable()
export class SuborganizationEffects {

    @Effect()
    addCitizen$ = this.actions$
        .ofType<SuborgActions.AddCitizen>(SuborgActions.SuborganizationActionTypes.AddCitizen)
        .pipe(
            map(action => action.payload),
            exhaustMap(citizenChangeForm => {
                this.loadingService.setLoading(true)
                return this.citizenApi.createCitizen(citizenChangeForm)
                    .pipe(
                        switchMap(resp => of(new SuborgActions.SelectCitizen(toCitizenSearchResult(resp.citizenData)))),
                        finalize(() => this.loadingService.setLoading(false))
                    )
            })
        );

    @Effect()
    advancedSearch = this.actions$.pipe(
        ofType<SuborgActions.AdvancedSearch>(SuborgActions.SuborganizationActionTypes.AdvancedSearch),
        map(action => action.payload),
        exhaustMap(advancedSearchForm => {
            this.loadingService.setLoading(true)
            return this.citizenApi.citizenAdvancedSearch(
                advancedSearchForm)
                .pipe(
                    mergeMap(searchResults => [
                        new SuborgActions.AdvancedSearchSuccess(searchResults)
                    ]),
                    catchError(error => of(new SuborgActions.AdvancedSearchFailure(error))),
                    finalize(() => this.loadingService.setLoading(false))
                );
        })
    );

    @Effect()
    refreshFillablePositions$ = this.actions$
        .ofType<SuborgActions.GetPositionsToFillBySuborganizationId>
        (SuborgActions.SuborganizationActionTypes.GetPositionsToFillBySuborganizationId)
        .pipe(
            switchMap(action => {
                this.loadingService.setLoading(true)
                return this.suborganizationService.getSuborganizationFillablePositions(action.payload.id, action.payload.organizationId)
                    .pipe(
                        map((data: FillablePositions) => {
                            // this.router.navigate([`/suborganizations/list/${action.payload.id}`, {
                            //     organizationId: action.payload.organizationId
                            // }]);
                            return new SuborgActions.GetPositionsToFillBySuborganizationIdSuccess(data)
                        }),
                        catchError((err: any) => {
                            swal({
                                title: 'Data Load Error',
                                text: 'Unable to load positions',
                                buttonsStyling: false,
                                confirmButtonClass: 'btn btn-info'
                            }).catch(swal.noop);
                            return of(new SuborgActions.GetPositionsToFillBySuborganizationIdFailure(err))
                        }),
                        finalize(() => this.loadingService.setLoading(false))
                    )
            })
        );

    @Effect()
    selectSuborganization$ = this.actions$
        .ofType<SuborgActions.SelectSuborganization>(SuborgActions.SuborganizationActionTypes.SelectSuborganization)
        .pipe(
            map(action => action.payload),
            switchMap(suborg => {
                return of(new SuborgActions.GetPositionsToFillBySuborganizationId(suborg))
            })
        );

    @Effect()
    quickSearch$ = this.actions$.pipe(
        ofType<SuborgActions.QuickSearch>(SuborgActions.SuborganizationActionTypes.QuickSearch),
        map(action => action.payload),
        exhaustMap(quickSearchForm => {
            this.loadingService.setLoading(true)
            return this.citizenApi.citizenQuickSearch(
                quickSearchForm.firstThree,
                quickSearchForm.houseNumber)
                .pipe(
                    mergeMap(searchResults => [
                        new SuborgActions.QuickSearchSuccess(searchResults)
                    ]),
                    catchError(error => of(new SuborgActions.QuickSearchFailure(error))),
                    finalize(() => this.loadingService.setLoading(false))
                );
        })
    );

    @Effect()
    assignPosition$ = this.actions$.pipe(
        ofType<SuborgActions.AssignPosition>(SuborgActions.SuborganizationActionTypes.AssignPosition),
        map(action => action.payload),
        exhaustMap(assignForm => {
            this.loadingService.setLoading(true)
            return this.assignmentsService.assignPosition(assignForm)
                .pipe(
                    mergeMap((assignmentResponse: PositionAssignmentResult) => {
                        return [
                            new SuborgActions.AssignPositionSuccess(assignmentResponse),
                            new SuborgActions.GetPositionsToFillBySuborganizationId({
                                categoryName: '',
                                commonName: assignForm.suborganizationName,
                                description: '',
                                id: assignForm.suborganizationId,
                                organizationId: assignmentResponse.organizationId
                            })
                        ];
                    }),
                    catchError(err => {
                        return of(new SuborgActions.AssignPositionFailure(err));
                    }),
                    finalize(() => this.loadingService.setLoading(false))
                )
        })
    );

    @Effect({dispatch: false})
    assignPositionSuccess$ = this.actions$.pipe(
        ofType<SuborgActions.AssignPositionSuccess>(SuborgActions.SuborganizationActionTypes.AssignPositionSuccess),
        map(action => action['payload']),
        tap((resp: any) => {
            // this.router.navigate([`/suborganizations`])
        })
    );

    @Effect()
    dismissPosition$ = this.actions$.pipe(
        ofType<SuborgActions.DismissPosition>(SuborgActions.SuborganizationActionTypes.DismissPosition),
        map(action => action.payload),
        exhaustMap(positionAssignment => {
            this.loadingService.setLoading(true)
            return this.assignmentsService.dismissPosition(positionAssignment.positionAssignmentId)
                .pipe(
                    mergeMap(() => {
                        return [
                            new SuborgActions.DismissPositionSuccess(),
                            new SuborgActions.GetPositionsToFillBySuborganizationId({
                                categoryName: '', commonName: '', description: '',
                                id: positionAssignment.assignedSuborganizationId,
                                organizationId: positionAssignment.organizationId
                            })]
                    }),
                    catchError(() => of(new SuborgActions.DismissPositionFailure())),
                    finalize(() => this.loadingService.setLoading(false))
                )
        })
    );

    constructor(
        private actions$: Actions,
        private assignmentsService: AssignmentsService,
        private router: Router,
        private route: ActivatedRoute,
        private suborganizationService: SuborganizationService,
        private citizenApi: CitizenApi,
        private loadingService: LoadingService
    ) {
    }
}
