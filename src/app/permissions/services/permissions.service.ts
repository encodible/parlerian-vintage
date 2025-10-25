import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Permissions} from '../permissions';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {

    permissions: Permissions = null;

    constructor(private httpClient: HttpClient,
                private toastr: ToastrService) {
    }

    refreshPermissions(): Observable<Permissions> {
        return this.httpClient.get<Permissions>(`${environment.baseUrl}/v1.0/permissions`)
    }

    initializePermissions(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.refreshPermissions().subscribe(
                (permissions) => {
                    this.permissions = permissions
                    resolve(true)
                },
                (error) => {
                    console.log(`Permissions get error: ${JSON.stringify(error)}`)
                    this.toastr.error(`Unable to get permissions`)
                    reject(false)
                }
            )
        })
    }

    getPermissions() {
        return this.permissions;
    }
}
