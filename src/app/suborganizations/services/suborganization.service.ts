import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Suborganization, SuborganizationAuthorization} from '../models/suborganization';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {FillablePositions} from '../../assignments/positions';
import {PositionAssignment} from '../../assignments/models/PositionAssignment';

@Injectable({
    providedIn: 'root'
})
export class SuborganizationService {


    constructor(private httpClient: HttpClient) {
    }

    public getSuborganization(id: number): Observable<Suborganization> {
        return this.httpClient.get<any>(`${environment.baseUrl}/v1.0/suborganizations/${id}`)
            .pipe(
                map(response => {
                    return response.data
                })
            )
    }


    public getSuborganizations(): Observable<SuborganizationAuthorization[]> {
        return this.httpClient.get<any>(`${environment.baseUrl}/v1.0/suborganizations`)
            .pipe(
                map(response => {
                    return response.data
                })
            )
    }

    public getSuborganizationFillablePositions(suborganizationId: number, organizationId: number): Observable<FillablePositions> {
        return this.httpClient.get<any>(
            `${environment.baseUrl}/v1.0/position-allocations/${suborganizationId}?organizationId=${organizationId}`)
    }

    public getSuborganizationAllocationByPosition(suborganizationId: number, positionId: number): Observable<FillablePositions> {
        return this.httpClient.get<any>(
            `${environment.baseUrl}/v1.0/position-allocations/${suborganizationId}/position/${positionId}`
        )
    }

    public getSuborganizationPositionAssignments(id: number): Observable<PositionAssignment[]> {
        return this.httpClient.get<any>(`${environment.baseUrl}/v1.0/suborganizations/${id}/position-assignments`)
            .pipe(
                map(response => {
                    return response.data
                })
            )
    }

    public getSuborganizationAssignmentsByPosition(suborganizationId: number, positionId: number): Observable<PositionAssignment[]> {
        return this.httpClient.get<any>(
            `${environment.baseUrl}/v1.0/suborganizations/${suborganizationId}/position-assignments/${positionId}`)
            .pipe(
                map(response => {
                    return response.data
                })
            )
    }

    public searchAssignmentsByName(firstName: string, lastName: string): Observable<any> {
        return this.httpClient.get<any>(
            `${environment.baseUrl}/v1.0/position-assignments/search?firstName=${firstName}&lastName=${lastName}`
        )
    }

    public searchAssignmentsByQuickSearch(firstThree: string, houseNumber: number): Observable<any> {
        return this.httpClient.get<any>(
            `${environment.baseUrl}/v1.0/position-assignments/quicksearch?firstThree=${firstThree}&houseNumber=${houseNumber}`
        )
    }
}
