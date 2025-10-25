import {Injectable} from '@angular/core';
import {EventCreationResponse, EventInfo} from '../models/OrganizationEvent';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AttendanceReport} from '../models/AttendanceReport';

@Injectable()
export class OrganizationEventsService {

    constructor(private httpClient: HttpClient) {
    }

    public getOrganizationEvents(): Observable<EventInfo[]> {
        return this.httpClient.get<EventInfo[]>(`${environment.baseUrl}/v1.0/organization-events`)
    }

    public createEvent(event): Observable<EventCreationResponse> {
        return this.httpClient.post<EventCreationResponse>(`${environment.baseUrl}/v1.0/organization-events`, event)
    }

    public getEventAttendees(eventId: number) {
        return this.httpClient.get<AttendanceReport>(`${environment.baseUrl}/v1.0/organization-events/${eventId}/attendees`)
    }
}
