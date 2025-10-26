import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';
import {CitizenAdvancedSearchForm} from '../../../people/services/citizen-api.service';
import {MyErrorStateMatcher} from './MyErrorStateMatcher';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule]
})
export class AdvancedSearchComponent implements OnInit {

  @Output()
  onSearch: EventEmitter<CitizenAdvancedSearchForm> = new EventEmitter<CitizenAdvancedSearchForm>();

  firstNameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  streetAddressControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);
  zipControl = new FormControl('', [Validators.required]);
  dobControl = new FormControl('', [Validators.required]);

  advancedSearch: FormGroup;
  matcher = new MyErrorStateMatcher();
  validFirstName = false;
  validLastName = false;
  validStreetAddress = false;
  validCity = false;
  validZipCode = false;
  validDob = false;

  namePattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  streetPattern =  /^\s*\S+(?:\s+\S+){2}/;
  zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
  dobPattern = /^\d{4}-\d{2}-\d{2}$/;

  constructor(private formBuilder: FormBuilder) { }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  ngOnInit() {
    this.advancedSearch = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(20)]],
      lastName: ['',  [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(20)]],
      streetAddress: ['',  [Validators.required, Validators.pattern(this.streetPattern), Validators.maxLength(120)]],
      city: ['',  [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(50)]],
      zipCode: ['',  [Validators.required, Validators.pattern(this.zipCodePattern)]],
      dob: ['',  [Validators.required, Validators.pattern(this.dobPattern)]],
    });
  }

  search() {
    if (this.advancedSearch.valid) {
      const formValue = this.advancedSearch.value;
      this.onSearch.emit({
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        streetAddress: formValue.streetAddress,
        city: formValue.city,
        zipCode: formValue.zipCode,
        dob: moment(formValue.dob).format('MM-DD-YYYY')
      })
    } else {
      console.error(`Error Advance Searching Citizen  ${JSON.stringify(this.advancedSearch.value)}`)
    }
  }

  firstNameValidation(e) {
    this.validFirstName = e.length < 20 && e.length > 1 && this.namePattern.test(String(e));
  }
  lastNameValidation(e) {
    this.validLastName = e.length < 20 && e.length > 1 && this.namePattern.test(String(e));
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
  dobValidation(e) {
    this.validDob = this.dobPattern.test(String(e));
  }

}
