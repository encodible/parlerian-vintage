import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';

import {AppComponent} from './app.component';

import {SidebarModule} from './sidebar/sidebar.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FixedpluginModule} from './shared/fixedplugin/fixedplugin.module';
import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {AppRoutes} from './app.routing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {CustomRouterStateSerializer} from './router';
import {AuthModule} from './auth/auth.module';
import {MaterialModule} from './material/material.module';
import {JwtInterceptor} from './core/services/jwt-interceptor';
import {SearchResultGuard} from './people/services/search-result-guard';
import {CitizenSelectedGuard} from './people/services/citizen-selected-guard';
import {ToastrModule} from 'ngx-toastr';
import {AssignmentsService} from './assignments/services/assignments.service';
import {PermissionsService} from './permissions';
import {PositionService} from './assignments/services/position.service';
import {LoadingService} from './shared/loading.service';


@NgModule({
    imports: [
        AuthModule.forRoot(),
        CoreModule,
        CommonModule,
        BrowserAnimationsModule,
        EffectsModule.forRoot([]),
        FixedpluginModule,
        FooterModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        MatNativeDateModule,
        NavbarModule,
        RouterModule.forRoot(AppRoutes),
        SidebarModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
        }),
        StoreDevtoolsModule.instrument({
            name: 'Veti Web DevTools',
            logOnly: environment.production,
        }),
        ToastrModule.forRoot(),
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent
    ],
    declarations: [],
    bootstrap: [AppComponent],
    providers: [
        AssignmentsService,
        CitizenSelectedGuard,
        LoadingService,
        PermissionsService,
        PositionService,
        {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        SearchResultGuard
    ]
})
export class AppModule {
}
