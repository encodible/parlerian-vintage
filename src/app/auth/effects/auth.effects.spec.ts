import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Router } from '@angular/router';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { AuthActionTypes } from '../actions/auth.actions';
import { UaaService } from '../../core';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<UaaService>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('UaaService', ['logout']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: Router, useValue: routerSpy },
        { provide: UaaService, useValue: authServiceSpy },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(UaaService) as jasmine.SpyObj<UaaService>;
  });

  describe('loginSuccess$', () => {
    it('should navigate to home on login success', () => {
      const action = { type: AuthActionTypes.LoginSuccess };
      actions$ = hot('-a', { a: action });

      // Since this effect has { dispatch: false }, we don't expect any output
      // We just verify the side effect (navigation) happens
      effects.loginSuccess$.subscribe();

      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('loginRedirect$', () => {
    it('should logout and navigate to login on logout action', () => {
      const action = { type: AuthActionTypes.Logout };
      actions$ = hot('-a', { a: action });

      effects.loginRedirect$.subscribe();

      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should logout and navigate to login on login redirect action', () => {
      const action = { type: AuthActionTypes.LoginRedirect };
      actions$ = hot('-a', { a: action });

      effects.loginRedirect$.subscribe();

      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('Service Injection', () => {
    it('should have properly injected services', () => {
      expect(effects.actions$).toBeDefined();
      expect(effects.authService).toBeDefined();
      expect(effects.router).toBeDefined();
    });

    it('should allow mocking of injected services', () => {
      // You can now access and mock the services directly
      expect(effects.authService.logout).toBeDefined();
      expect(effects.router.navigate).toBeDefined();
    });
  });
});
