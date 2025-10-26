import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../advanced-search/MyErrorStateMatcher';
import {CitizenChangeForm, CitizenSearchResult} from '../../../people/services/citizen-api.service';
import moment from 'moment';
import {Location} from '@angular/common';
import {FieldErrorDisplayComponent} from '../field-error-display/field-error-display.component';

@Component({
    selector: 'app-citizen-form',
    templateUrl: './citizen-form.component.html',
    styleUrls: ['./citizen-form.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, FieldErrorDisplayComponent]
})
export class CitizenFormComponent implements OnInit {


    @Input()
    isUpdating = false;
    @Input()
    initCitizen: CitizenSearchResult = null;
    @Output()
    onChange = new EventEmitter<CitizenChangeForm>();
    @Output()
    onClear = new EventEmitter<any>();

    firstNameControl = new FormControl('', [Validators.required]);
    middleNameControl = new FormControl('', [Validators.required]);
    lastNameControl = new FormControl('', [Validators.required]);
    houseStreetNumber = new FormControl('', [Validators.required]);
    streetAddressControl = new FormControl('', [Validators.required]);
    cityControl = new FormControl('', [Validators.required]);
    stateControl = new FormControl('', [Validators.required]);
    zipControl = new FormControl('', [Validators.required]);
    affiliationControl = new FormControl('', [Validators.required, Validators.maxLength(40)]);
    precinctControl = new FormControl('', [Validators.required, Validators.maxLength(40)]);
    phoneControl = new FormControl('', [Validators.required]);
    emailControl = new FormControl('', [Validators.email]);
    dobControl = new FormControl('', []);
    stateVoterId = new FormControl('', [Validators.required]);

    citizenForm: FormGroup;
    matcher = new MyErrorStateMatcher();
    startDate = new Date();
    validFirstName = false;
    validMiddleName = false;
    validLastName = false;
    validHouseStreetNumber = false;
    validStreetAddress = false;
    validCity = false;
    validState = false;
    validZipCode = false;
    validAffiliation = false;
    validPrecinct = false;
    validPhone = false;
    validEmail = false;
    validDob = false;
    validStateVoterId = false;

    // tslint:disable-next-line:max-line-length
    emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    namePattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    middleNamePattern = /\w+([, ]+\w+){1,2}/;
    houseStreetNumberPattern = /^\d{1,10}$/;
    stateVoterIdPattern = /^\d{1,20}$/;
    streetPattern = /^\s*\S+(?:\s+\S+){2}/;
    zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
    dobPattern = /^\d{4}-\d{2}-\d{2}$/;
    phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    constructor(private formBuilder: FormBuilder,
                private location: Location) {
        this.initCitizen = this.getEmptyCitizen()
    }

    back() {
        this.location.back();
    }

    getEmptyCitizen() {
        return {
            firstName: '',
            middleName: '',
            lastName: '',
            houseStreetNumber: null,
            address: '',
            city: '',
            state: '',
            zip: '',
            affiliation: '',
            phone: '',
            email: '',
            stateVoterId: null,
            personId: null,
            congressional: null,
            county: '',
            precinct: '',
            stateHouse: null,
            stateSenate: null
        }
    }

    emitFormValue() {
        this.onChange.emit(this.toCitizenForm(this.citizenForm.value));
    }

    clearForm() {
        this.initCitizen = this.getEmptyCitizen();
        this.initializeForm(this.formBuilder);
        this.onClear.emit({});
    }

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    ngOnInit() {
        this.initializeForm(this.formBuilder);
    }

    initializeForm(formBuilder) {
        if (this.initCitizen === null) {
            this.initCitizen = this.getEmptyCitizen();
        }
        this.citizenForm = formBuilder.group({
            firstName: [this.initCitizen.firstName, [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(20)]],
            middleName: [this.initCitizen.middleName, [/*Validators.pattern(this.middleNamePattern),*/ Validators.maxLength(20)]],
            lastName: [this.initCitizen.lastName, [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(20)]],
            houseStreetNumber: [this.initCitizen.houseStreetNumber, [
                Validators.required, Validators.pattern(this.houseStreetNumberPattern)]],
            streetAddress: [this.initCitizen.address,
                [Validators.required, Validators.pattern(this.streetPattern), Validators.maxLength(120)]],
            city: [this.initCitizen.city, [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(50)]],
            state: [this.initCitizen.state, [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(50)]],
            zipCode: [this.initCitizen.zip, [Validators.required, Validators.pattern(this.zipCodePattern)]],
            affiliation: [this.initCitizen.affiliation, [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(40)]],
            precinct: [this.initCitizen.precinct, [Validators.required, Validators.maxLength(40)]],
            phone: [this.initCitizen.phone, [Validators.pattern(this.phonePattern), Validators.maxLength(50)]],
            email: [this.initCitizen.email, [Validators.pattern(this.emailPattern), Validators.maxLength(50)]],
            dob: ['', [Validators.pattern(this.dobPattern)]],
            stateVoterId: [this.initCitizen.stateVoterId, [Validators.pattern(this.stateVoterIdPattern)]],
        });
    }

    toCitizenForm(formData): CitizenChangeForm {
        return {
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            houseStreetNumber: formData.houseStreetNumber,
            addressLine1: formData.streetAddress,
            addressLine2: '',
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            affiliation: formData.affiliation,
            precinct: formData.precinct,
            email: formData.email,
            phone: formData.phone,
            dob: formData.dob ? moment(formData.dob).format('MM-DD-YYYY') : '',
            stateVoterId: formData.stateVoterId
        }
    }

    emailValidation(e) {
        this.validEmail = this.emailPattern.test(String(e).toLowerCase());
    }

    firstNameValidation(e) {
        this.validFirstName = e.length < 20 && e.length > 1 && this.namePattern.test(String(e));
    }

    middleNameValidation(e) {
        this.validMiddleName = e.length < 20 && e.length >= 0; // && this.middleNamePattern.test(String(e));
    }

    lastNameValidation(e) {
        this.validLastName = e.length < 20 && e.length > 1 && this.namePattern.test(String(e));
    }

    houseStreetNumberValidation(e) {
        this.validHouseStreetNumber = this.houseStreetNumberPattern.test(String(e))
    }

    streetAddressValidation(e) {
        this.validStreetAddress = e.length < 120 && this.streetPattern.test(String(e));
    }

    cityValidation(e) {
        this.validCity = e.length < 50 && e.length > 2 && this.namePattern.test(String(e));
    }

    zipCodeValidation(e) {
        this.validZipCode = this.zipCodePattern.test(String(e));
    }

    stateValidation(e) {
        this.validState = e.length < 50 && e.length > 2 && this.namePattern.test(String(e));
    }

    affiliationNameValidation(e) {
        this.validAffiliation = e.length < 40 && e.length > 1 && this.namePattern.test(String(e));
    }

    precinctNameValidation(e) {
        this.validPrecinct = e.length < 40 && e.length > 1;
    }

    phoneValidation(e) {
        this.validPhone = this.phonePattern.test(String(e));
    }

    dobValidation(e) {
        this.validDob = this.dobPattern.test(String(e));
    }

    stateVoterIdValidation(e) {
        this.validStateVoterId = this.stateVoterIdPattern.test(String(e))
    }

}
