import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CURRENT_USER} from '../../auth/services/uaa.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const parsedUser = JSON.parse(localStorage.getItem(CURRENT_USER));
        if (parsedUser && parsedUser.accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ` + parsedUser.accessToken
                }
            })
        }
        return next.handle(request);
    }
}
