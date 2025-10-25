import {Authenticate, User} from '../models/User';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {CURRENT_USER} from './uaa.service';

/**
 * @author Kent Bull
 */
@Injectable()
export class UaaMockService {
    constructor() {
    }

    login(authenticate: Authenticate): Observable<User> {
        localStorage.setItem(
            CURRENT_USER,
            JSON.stringify({username: 'test', accessToken: 'asdf'}));
        return of({username: 'test', accessToken: 'asdf'})
    }

    logout() {
        localStorage.removeItem(CURRENT_USER);
    }
}
