import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {PositionDto} from '../positions';

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private http: HttpClient) {
    }

    getPositions(): Observable<PositionDto[]> {
        return this.http.get<PositionDto[]>(`${environment.baseUrl}/v1.0/positions`)
    }

    getPositionReport(positionDto: PositionDto) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            responseType: 'blob' as 'blob'
        }

        return this.http.post(
            `${environment.baseUrl}/v1.0/positions/reports/by-position`,
            {
                positions: [positionDto.name]
            },
            options)
    }
}
