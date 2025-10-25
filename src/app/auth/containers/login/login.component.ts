import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {UaaService} from '../../../core/index';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {LoginFailure, LoginSuccess} from '../../actions/auth.actions';

import * as fromAuth from '../../reducers';
import {catchError, finalize, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environments/environment';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    toggleButton: any;
    sidebarVisible: boolean;
    nativeElement: Node;
    loginForm: FormGroup;
    returnUrl = '';
    submitted = false;
    loading = false;
    error = '';
    version = environment.version;

    constructor(private element: ElementRef,
                private uaa: UaaService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private store: Store<fromAuth.State>,
                private toastr: ToastrService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }


    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        // body.classList.add('off-canvas-sidebar'); // keep commented out since overlays login form
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.uaa.logout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    sidebarToggle() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        const sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible === false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }


    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        // body.classList.remove('off-canvas-sidebar');
    }


    loginHandler() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        const {username, password} = this.loginForm.value;
        this.uaa
            .login({username, password})
            .pipe(
                map(user => {

                    this.store.dispatch(new LoginSuccess({user}))
                }),
                catchError(this.dispatcherror),
                finalize(() => this.loading = false)
            )
            .subscribe(
                () => {
                    this.toastr.info('Login success');
                },
                () => {
                    this.toastr.error('Incorrect credentials', 'Login Failure')
                })
    }

    dispatcherror(error): Observable<any> {
        const action = new LoginFailure(error)
        this.store.dispatch(action)
        return of(action)
    }
}
