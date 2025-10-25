import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const testUser = {id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User'};


        return of(null).pipe(mergeMap(() => {
            // authenticate
            if (request.url.endsWith('/uaa/login') && request.method === 'POST') {
                if (request.body.username === testUser.username && request.body.password === testUser.password) {
                    // if login details are valid return 200 OK with a fake jwt token
                    return of(new HttpResponse({status: 200, body: {access_token: 'fake-jwt-token'}}));
                } else {
                    // else return 400 bad request
                    return throwError('Username or password is incorrect');
                }
            }

            // get users
            if (request.url.endsWith('/organization') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid,
                // this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({status: 200, body: [testUser]}));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError('Unauthorised');
                }
            }

            // pass through any requests not handled above
            return next.handle(request)
                .pipe(materialize())
                .pipe(delay(500))
                .pipe(dematerialize());
        }));
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};