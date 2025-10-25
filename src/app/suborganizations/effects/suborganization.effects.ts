import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
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
    // Make services public for testing
    public readonly actions$ = inject(Actions);
    public readonly assignmentsService = inject(AssignmentsService);
    public readonly router = inject(Router);
    public readonly route = inject(ActivatedRoute);
    public readonly suborganizationService = inject(SuborganizationService);
    public readonly citizenApi = inject(CitizenApi);
    public readonly loadingService = inject(LoadingService);

    addCitizen$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SuborgActions.SuborganizationActionTypes.AddCitizen),
            map((action: SuborgActions.AddCitizen) => action.payload),
            exhaustMap(citizenChangeForm => {
                this.loadingService.setLoading(true)
                return this.citizenApi.createCitizen(citizenChangeForm)
                    .pipe(
                        switchMap(resp => of(new SuborgActions.SelectCitizen(toCitizenSearchResult(resp.citizenData)))),
                        finalize(() => this.loadingService.setLoading(false))
                    )
            })
        )
    );

    advancedSearch = createEffect(() =>
        this.actions$.pipe(
            ofType(SuborgActions.SuborganizationActionTypes.AdvancedSearch),
            map((action: SuborgActions.AdvancedSearch) => action.payload),
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
        )
    );

    refreshFillablePositions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SuborgActions.SuborganizationActionTypes.GetPositionsToFillBySuborganizationId),
            switchMap((action: SuborgActions.GetPositionsToFillBySuborganizationId) => {
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
        )
    );

    selectSuborganization$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SuborgActions.SuborganizationActionTypes.SelectSuborganization),
            map((action: SuborgActions.SelectSuborganization) => action.payload),
            switchMap(suborg => {
                return of(new SuborgActions.GetPositionsToFillBySuborganizationId(suborg))
            })
        )
    );

    quickSearch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SuborgActions.SuborganizationActionTypes.QuickSearch),
            map((action: SuborgActions.QuickSearch) => action.payload),
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
        )
    );

    assignPosition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SuborgActions.SuborganizationActionTypes.AssignPosition),
            map((action: SuborgActions.AssignPosition) => action.payload),
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
        )
    );

    assignPositionSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SuborgActions.SuborganizationActionTypes.AssignPositionSuccess),
            map((action: SuborgActions.AssignPositionSuccess) => action.payload),
            tap((resp: any) => {
                // this.router.navigate([`/suborganizations`])
            })
        ), { dispatch: false }
    );

    dismissPosition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SuborgActions.SuborganizationActionTypes.DismissPosition),
            map((action: SuborgActions.DismissPosition) => action.payload),
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
        )
    );
}
