import {fakeAsync, inject, TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth-guard.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AppRoutes} from '../../app.routing';
import {AppModule} from '../../app.module';
import {APP_BASE_HREF} from '@angular/common';

describe('AuthGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(AppRoutes), AppModule],
            providers: [AuthGuard,
                {provide: APP_BASE_HREF, useValue: '/'}]
        });
    });

    it('should deny if no user', fakeAsync(inject([AuthGuard], (guard: AuthGuard) => {
        /*
        TODO learn how to test the router with lazy loaded modules
        const router = TestBed.get(Router);
        const location = TestBed.get(Location);
        const fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();

        const loader = TestBed.get(NgModuleFactoryLoader);
        loader.stubbedModules = {lazyModule: DashboardModule};
        router.resetConfig([
            {path: '', loadChildren: 'lazyModule'}
        ]);


        tick();
        fixture.detectChanges();
        expect(guard.canActivate(<ActivatedRouteSnapshot>{}, <RouterStateSnapshot>{})).toBeTruthy();

        expect(location.path()).toBe('');
        */
    })));
});
