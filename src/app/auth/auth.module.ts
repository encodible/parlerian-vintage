import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';

import {EditUserComponent} from './containers/edit-user/edit-user.component';
import {UserProfileComponent} from './containers/user-profile/user-profile.component';
import {PricingComponent} from './containers/pricing/pricing.component';
import {LockComponent} from './containers/lock/lock.component';
import {LoginComponent} from './containers/login/login.component';
import {RegisterComponent} from './containers/register/register.component';
import {NotFoundComponent} from './containers/not-found/not-found.component';
import {MaterialModule} from '../material/material.module';
import {UaaService} from './services/uaa.service';
import {AuthGuard} from './services/auth-guard.service';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './effects/auth.effects';
import {UaaMockService} from './services/uaa-mock.service';
import {reducers} from './reducers';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    declarations: [
        EditUserComponent,
        LoginComponent,
        NotFoundComponent,
        RegisterComponent,
        LockComponent,
        PricingComponent,
        UserProfileComponent
    ]
})

export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootAuthModule,
            providers: [{provide: UaaService, useClass: UaaService}, AuthGuard],
        };
    }
}

@NgModule({
    imports: [
        AuthModule,
        RouterModule.forChild([{path: 'login', component: LoginComponent}]),
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([AuthEffects]),
    ],
})
export class RootAuthModule {
}
