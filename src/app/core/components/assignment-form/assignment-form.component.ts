import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {Suborganization} from '../../../suborganizations/models/suborganization';
import {PositionToFill} from '../../../assignments/positions';
import {PositionAssignmentForm} from '../../../assignments/position-assignments';
import {CitizenSearchResult} from '../../../people/services/citizen-api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../advanced-search/MyErrorStateMatcher';
import {Location} from '@angular/common';

@Component({
    selector: 'app-assignment-form',
    templateUrl: './assignment-form.component.html',
    styleUrls: ['./assignment-form.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule]
})
export class AssignmentFormComponent implements OnInit, OnChanges {

    @Input()
    suborganization: Suborganization;
    @Input()
    positionToFill: PositionToFill;
    @Input()
    initCitizen: CitizenSearchResult;
    @Output()
    onClear = new EventEmitter<any>();

    @Output()
    onAssign: EventEmitter<PositionAssignmentForm> = new EventEmitter<PositionAssignmentForm>();

    assignmentForm: FormGroup;

    // form controls and validations
    firstNameControl = new FormControl('', [Validators.required]);
    middleNameControl = new FormControl('', [Validators.required]);
    lastNameControl = new FormControl('', [Validators.required]);
    streetAddressControl = new FormControl('', [Validators.required]);
    phoneControl = new FormControl('', [Validators.required]);
    emailControl = new FormControl('', [
        Validators.email,
    ]);

    matcher = new MyErrorStateMatcher();
    validFirstName = false;
    validMiddleName = false;
    validLastName = false;
    validStreetAddress = false;
    validPhone = false;
    validEmail = false;

    // regex patterns
    // tslint:disable-next-line:max-line-length
    emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    namePattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    middleNamePattern = /\w+([, ]+\w+){1,2}/;
    streetPattern = /^\s*\S+(?:\s+\S+){2}/;
    phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    constructor(private formBuilder: FormBuilder,
                private location: Location) {
        if (this.initCitizen === null) {
            this.initCitizen = this.getEmptyCitizen();
        }
    }

    assignPosition() {
        this.onAssign.emit(this.assignmentForm.value);
    }

    back() {
        this.location.back();
    }

    clearForm() {
        this.initCitizen = this.getEmptyCitizen();
        this.initializeForm(this.formBuilder);
        this.onClear.emit({});
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
            phone: '',
            email: '',
            stateVoterId: null,
            personId: null,
            affiliation: '',
            congressional: null,
            county: '',
            precinct: '',
            stateHouse: null,
            stateSenate: null
        }
    }

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    initializeForm(formBuilder) {
        this.assignmentForm = formBuilder.group({
            firstName: [this.initCitizen.firstName, [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(20)]],
            middleName: [this.initCitizen.middleName, [/*Validators.pattern(this.middleNamePattern),*/ Validators.maxLength(20)]],
            lastName: [this.initCitizen.lastName, [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(20)]],
            streetAddress: [this.initCitizen.address,
                [Validators.required, Validators.pattern(this.streetPattern), Validators.maxLength(120)]],
            phone: [this.initCitizen.phone, [Validators.pattern(this.phonePattern), Validators.maxLength(50)]],
            email: [this.initCitizen.email, [Validators.pattern(this.emailPattern), Validators.maxLength(50)]],
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.initCitizen = changes['initCitizen'].currentValue;
        this.updateSelectedCitizenForm(this.formBuilder, this.initCitizen = changes['initCitizen'].currentValue)
    }

    ngOnInit() {
        if (this.initCitizen === null) {
            this.initCitizen = this.getEmptyCitizen();
        }
        this.initializeForm(this.formBuilder);
    }

    updateSelectedCitizenForm(formBuilder: FormBuilder, selectedCitizen: CitizenSearchResult) {
        let data: any;
        if (selectedCitizen == null) {
            data = {
                firstName: '',
                middleName: '',
                lastName: '',
                streetAddress: '',
                phone: '',
                email: '',
            }
        } else {
            data = selectedCitizen;
        }
        this.assignmentForm = this.formBuilder.group({
            firstName: [data.firstName, [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(20)]],
            middleName: [data.middleName, [/*Validators.pattern(this.middleNamePattern)*/, Validators.maxLength(20)]],
            lastName: [data.lastName, [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(20)]],
            streetAddress: [data.address, [Validators.required, Validators.pattern(this.streetPattern), Validators.maxLength(120)]],
            phone: [data.phone, [Validators.pattern(this.phonePattern), Validators.maxLength(50)]],
            email: [data.email, [Validators.pattern(this.emailPattern), Validators.maxLength(50)]],
        });
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

    streetAddressValidation(e) {
        this.validStreetAddress = e.length < 120 && this.streetPattern.test(String(e));
    }

    phoneValidation(e) {
        this.validPhone = this.phonePattern.test(String(e));
    }

}
