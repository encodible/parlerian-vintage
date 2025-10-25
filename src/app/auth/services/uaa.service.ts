import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Authenticate, User} from '../models/User';
import {JwtHelperService} from '@auth0/angular-jwt';
import {PermissionsService} from '../../permissions';

export const CURRENT_USER = 'currentUser';

@Injectable({
    providedIn: 'root'
})
export class UaaService {

    private baseUrl = environment.baseUrl;
    private jwtHelper: JwtHelperService;

    constructor(public http: HttpClient,
                private router: Router,
                private permissionsService: PermissionsService) {
        this.jwtHelper = new JwtHelperService({});
    }


    login(authenticate: Authenticate): Observable<User> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', `application/x-www-form-urlencoded`);
        return this.http.post<HttpResponse<Object>>(
            `${this.baseUrl}/login?username=${authenticate.username}&password=${authenticate.password}`,
            {},
            {headers: headers, observe: 'response'})
            .pipe(map((response: any) => {
                const authHeader = response.headers.get('Authorization');
                const jwt = authHeader.split(' ')[1];
                if (authHeader && jwt) {
                    const user = {username: authenticate.username, accessToken: jwt};
                    localStorage.setItem(
                        CURRENT_USER,
                        JSON.stringify(user));
                    this.permissionsService.initializePermissions()
                        .then(
                            () => {},
                            () => {
                                this.logout()
                            })
                    return user;
                }
                throw Error('Login failed');
            }))
    }

    logout() {
        localStorage.removeItem(CURRENT_USER);
        this.router.navigate(['/login'])
    }
}
