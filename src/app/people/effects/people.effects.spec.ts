import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Router } from '@angular/router';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { PeopleEffects } from './people.effects';
import * as CitizenActions from '../actions/citizens.actions';
import { CitizenApi } from '../services/citizen-api.service';
import { LoadingService } from '../../shared/loading.service';

describe('PeopleEffects', () => {
  let actions$: Observable<any>;
  let effects: PeopleEffects;
  let citizenApi: jasmine.SpyObj<CitizenApi>;
  let router: jasmine.SpyObj<Router>;
  let loadingService: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const citizenApiSpy = jasmine.createSpyObj('CitizenApi', [
      'citizenQuickSearch',
      'nameSearch', 
      'citizenAdvancedSearch',
      'createCitizen'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['setLoading']);

    TestBed.configureTestingModule({
      providers: [
        PeopleEffects,
        provideMockActions(() => actions$),
        { provide: CitizenApi, useValue: citizenApiSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
      ],
    });

    effects = TestBed.inject(PeopleEffects);
    citizenApi = TestBed.inject(CitizenApi) as jasmine.SpyObj<CitizenApi>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
  });

  describe('quickSearch$', () => {
    it('should dispatch CitizenSearchSuccess on successful search', () => {
      const quickSearchForm = { firstThree: 'ABC', houseNumber: '123' };
      const searchResults = [{ id: 1, name: 'John Doe' }];
      const action = new CitizenActions.QuickSearch(quickSearchForm);
      const completion = new CitizenActions.CitizenSearchSuccess(searchResults);

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: searchResults });
      citizenApi.citizenQuickSearch.and.returnValue(response);

      const expected = cold('-b', { b: completion });
      expect(effects.quickSearch$).toBeObservable(expected);
      expect(loadingService.setLoading).toHaveBeenCalledWith(true);
      expect(loadingService.setLoading).toHaveBeenCalledWith(false);
    });

    it('should dispatch CitizenSearchFailure on error', () => {
      const quickSearchForm = { firstThree: 'ABC', houseNumber: '123' };
      const error = new Error('Search failed');
      const action = new CitizenActions.QuickSearch(quickSearchForm);
      const completion = new CitizenActions.CitizenSearchFailure(error);

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      citizenApi.citizenQuickSearch.and.returnValue(response);

      const expected = cold('-b', { b: completion });
      expect(effects.quickSearch$).toBeObservable(expected);
    });
  });

  describe('citizenChange$', () => {
    it('should navigate to people list on successful citizen change', () => {
      const citizenForm: any = { firstName: 'John', lastName: 'Doe' };
      const changedCitizen = { citizenData: { id: 1, name: 'John Doe' } };
      const action = new CitizenActions.CitizenChange(citizenForm);
      const completion = new CitizenActions.ChangeCitizenSuccess(changedCitizen.citizenData);

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: changedCitizen });
      citizenApi.createCitizen.and.returnValue(response);

      const expected = cold('-b', { b: completion });
      expect(effects.citizenChange$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(['/people']);
    });
  });

  describe('navToSearchList$', () => {
    it('should navigate to people list on search success', () => {
      const searchResults = [{ id: 1, name: 'John Doe' }];
      const action = new CitizenActions.CitizenSearchSuccess(searchResults);

      actions$ = hot('-a', { a: action });

      effects.navToSearchList$.subscribe();

      expect(router.navigate).toHaveBeenCalledWith(['/people/list']);
    });
  });

  describe('Service Access', () => {
    it('should allow access to injected services for testing', () => {
      // With public readonly services, you can access them in tests
      expect(effects.actions$).toBeDefined();
      expect(effects.citizenApi).toBeDefined();
      expect(effects.router).toBeDefined();
      expect(effects.loadingService).toBeDefined();
    });

    it('should allow mocking of service methods', () => {
      // You can now access and mock the services directly
      expect(effects.citizenApi.citizenQuickSearch).toBeDefined();
      expect(effects.router.navigate).toBeDefined();
      expect(effects.loadingService.setLoading).toBeDefined();
    });
  });
});
