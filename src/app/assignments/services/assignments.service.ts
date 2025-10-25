import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {PositionAssignmentForm, PositionAssignmentResult, PositionAssignmentUpdate} from '../position-assignments';
import {ToastrService} from 'ngx-toastr';
import {Observable, throwError} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AssignmentsService {

    private baseUrl = environment.baseUrl;
    private assignmentUpdateData: PositionAssignmentUpdate;

    constructor(private httpClient: HttpClient,
                private toastr: ToastrService) {
    }

    updateAssignmentData(data) {
        this.assignmentUpdateData = data;
    }
    getAssignmentUpdateData() {
        return this.assignmentUpdateData;
    }

    public getAccessibleAssignments() {
        return this.httpClient.get<any>(`${this.baseUrl}/v1.0/position-assignments`)
            .pipe(
                map(response => response.data)
            );
    }

    public getAccessibleAllocations() {
        return this.httpClient.get<any>(`${this.baseUrl}/v1.0/position-allocations/missing-positions`)
            .pipe(
                map(response => response.data)
            )
    }

    public assignPosition(assignmentForm: PositionAssignmentForm) {
        return this.httpClient.post<PositionAssignmentResult>(`${environment.baseUrl}/v1.0/position-assignments`, assignmentForm)
            .pipe(
                map(res => {
                    console.log(`Assign position response ${JSON.stringify(res, null, 2)}`);
                    this.toastr.success(`${assignmentForm.positionName} assigned to
                    ${assignmentForm.firstName} in ${assignmentForm.suborganizationName}`);
                    return res;
                }),
                catchError((err: HttpErrorResponse) => {
                    let errorMessage = '';
                    switch (err.status) {
                        case 409:
                            // tslint:disable-next-line:max-line-length
                            errorMessage = `${assignmentForm.firstName} already assigned ${assignmentForm.positionName} in ${assignmentForm.suborganizationName}`
                            break;
                        case 414:
                            errorMessage = `${assignmentForm.suborganizationName} at allocation limit`;
                            break;
                        case 419:
                            // tslint:disable-next-line:max-line-length
                            errorMessage = `${assignmentForm.suborganizationName} has no ${assignmentForm.positionName} positions allocated `;
                            break;
                        case 404:
                        case 413:
                        case 416:
                        case 417:
                        case 418:
                            errorMessage = `Not checked in`;
                            break;
                        case 426:
                            errorMessage = `Unable to assign position`;
                            break;
                        case 428:
                            errorMessage = `Wrong assignee party`;
                            break;
                        default:
                            errorMessage = `Unexpected error`;
                            break;
                    }
                    this.toastr.error(errorMessage);
                    return throwError(errorMessage);
                })
            )
    }

    public dismissPosition(positionAssignmentId: number): Observable<any> {
        return this.httpClient.delete<any>(`${environment.baseUrl}/v1.0/position-assignments/${positionAssignmentId}`)
            .pipe(
                map(() => {
                    this.toastr.success('Position dismissed');
                }),
                catchError((err: HttpErrorResponse) => {
                    let errorMessage = '';
                    switch (err.status) {
                        case 403:
                            errorMessage = 'Insufficient permissions to dismiss';
                            break;
                        case 410:
                            errorMessage = 'No assignment found';
                            break;
                        default:
                            errorMessage = `Server error ${err.message}`;
                            break;
                    }
                    this.toastr.error(errorMessage);
                    return throwError(errorMessage);
                })
            )
    }

    public updateAssignment(positionAssignmentUpdate: PositionAssignmentUpdate): Observable<any> {
        return this.httpClient.put<any>(
            `${environment.baseUrl}/v1.0/position-assignments/${positionAssignmentUpdate.positionAssignmentId}`, positionAssignmentUpdate)
            .pipe(
                map(() => {
                    this.toastr.success('Assignment Updated');
                }),
                catchError((err: HttpErrorResponse) => {
                    let errorMessage = '';
                    switch (err.status) {
                        case 403:
                            errorMessage = 'Insufficient permissions to assign';
                            break;
                        case 410:
                            errorMessage = 'No assignment found';
                            break;
                        default:
                            errorMessage = `Server error ${err.message}`;
                            break;
                    }
                    this.toastr.error(errorMessage);
                    return throwError(errorMessage);
                })
            )
    }
}
