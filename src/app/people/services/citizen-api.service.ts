import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {exhaustMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitizenApi {

  constructor(private httpClient: HttpClient) { }

  createCitizen(newCitizen: CitizenChangeForm): Observable<CreateCitizenResponse> {
    return this.httpClient.post<CreateCitizenResponse>(`${environment.baseUrl}/v1.0/people`, newCitizen)
  }

  citizenQuickSearch(firstThree: string, houseNumber: number): Observable<CitizenSearchResult[]> {
    return this.httpClient.get<CitizenSearchResult[]>(
        `${environment.baseUrl}/v1.0/voter-registrations/search?firstThree=${firstThree}&houseNumber=${houseNumber}`
    );
  }

  nameSearch(firstName: string, lastName: string): Observable<CitizenSearchResult[]> {
    return this.httpClient.get<CitizenSearchResult[]>(
        `${environment.baseUrl}/v1.0/voter-registrations/search/name?firstName=${firstName}&lastName=${lastName}`
    );
  }


  citizenAdvancedSearch(form: CitizenAdvancedSearchForm): Observable<CitizenSearchResult[]> {
    return this.httpClient.post<CitizenSearchResult[]>(
        `${environment.baseUrl}/v1.0/voter-registrations/advanced-search`, form
    );
  }
}

export interface CreateCitizenResponse {
  citizenData: Citizen,
  status: string,
  error: string,
  errorMessage: string
}

export interface Citizen {
  personId: number,
  stateVoterId: number,
  firstName: string,
  middleName: string,
  lastName: string,
  phone: string,
  email: string,
  affiliation: string,
  address: string,
  houseStreetNumber: number,
  stateHouse: number,
  stateSenate: number,
  precinct: string,
  congressional: number,
  county: string,
  city: string,
  state: string,
  zip: string
}

export function toCitizenSearchResult(citizen: Citizen): CitizenSearchResult {
  return {
    personId: citizen.personId,
    stateVoterId: citizen.stateVoterId,
    firstName: citizen.firstName,
    middleName: citizen.middleName,
    lastName: citizen.lastName,
    phone: citizen.phone,
    email: citizen.email,
    affiliation: citizen.affiliation,
    address: citizen.address,
    houseStreetNumber: citizen.houseStreetNumber,
    state: citizen.state,
    city: citizen.city,
    zip: citizen.zip,
    stateHouse: citizen.stateHouse,
    stateSenate: citizen.stateSenate,
    precinct: citizen.precinct,
    congressional: citizen.congressional,
    county: citizen.county
  }
}

export interface CitizenChangeForm {
  firstName: string,
  middleName: string,
  lastName: string,
  houseStreetNumber: number,
  addressLine1: string,
  addressLine2: string,
  city: string,
  state: string,
  zipCode: string,
  affiliation: string,
  phone: number,
  email: string,
  dob: string,
  precinct: string,
  stateVoterId: number,
}

export interface CitizenQuickSearchForm {
  firstThree: string,
  houseNumber: number
}

export interface NameSearchForm {
  firstName: string,
  lastName: string
}

export interface CitizenAdvancedSearchForm {
  firstName: string;
  lastName: string;
  zipCode: string;
  dob: string;
  streetAddress: string;
  city: string;
}

export interface CitizenSearchResult {
  personId: number,
  stateVoterId: number,
  firstName: string,
  middleName: string,
  lastName: string,
  phone: string,
  email: string,
  affiliation: string,
  address: string,
  houseStreetNumber: number,
  city: string,
  state: string,
  zip: string,
  stateHouse: number,
  stateSenate: number,
  precinct: string,
  congressional: number,
  county: string
}
