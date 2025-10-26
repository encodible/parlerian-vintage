import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatError} from '@angular/material/form-field';
import {PositionToFill} from '../positions';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PositionAssignmentUpdate} from '../position-assignments';
import {MyErrorStateMatcher} from '../../core/components/advanced-search/MyErrorStateMatcher';
import {Location} from '@angular/common';
import {FieldErrorDisplayComponent} from '../../core/components/field-error-display/field-error-display.component';

@Component({
  selector: 'app-assignment-update-form',
  templateUrl: './assignment-update-form.component.html',
  styleUrls: ['./assignment-update-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, FieldErrorDisplayComponent]
})
export class AssignmentUpdateFormComponent implements OnInit {

  @Input()
  assignmentUpdate: PositionAssignmentUpdate;

  @Output()
  onUpdate: EventEmitter<PositionAssignmentUpdate> = new EventEmitter<PositionAssignmentUpdate>();
  @Output()
  onClear = new EventEmitter<any>();

  updateForm: FormGroup;

  updateData: any = null;

  firstNameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  streetAddressControl = new FormControl('', [Validators.required]);
  phoneControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  validFirstName = false;
  validLastName = false;
  validStreetAddress = false;
  validPhone = false;
  validEmail = false;

  // regex patterns
  // tslint:disable-next-line:max-line-length
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  namePattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  streetPattern = /^\s*\S+(?:\s+\S+){2}/;
  phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;


  constructor(private formBuilder: FormBuilder,
              private location: Location) {
    if (this.updateData === null) {
      this.updateData = this.getEmptyUpdate();
    }
    this.initializeForm(this.formBuilder, this.getEmptyUpdate());
  }

  back() {
    this.location.back();
  }

  clearForm() {
    this.initializeForm(this.formBuilder, this.getEmptyUpdate());
    this.onClear.emit({});
  }

  getEmptyUpdate() {
    return {
      firstName: '',
      lastName: '',
      streetAddress: '',
      phone: '',
      email: '',
    }
  }

  initializeForm(formBuilder, initData) {
    this.updateForm = formBuilder.group({
      firstName: [initData.firstName, [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(20)]],
      lastName: [initData.lastName, [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(20)]],
      streetAddress: [initData.streetAddress,
        [Validators.required, Validators.pattern(this.streetPattern), Validators.maxLength(120)]],
      phone: [initData.phone, [Validators.pattern(this.phonePattern), Validators.maxLength(50)]],
      email: [initData.email, [Validators.pattern(this.emailPattern), Validators.maxLength(50)]],
    });
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  mergeData(formValue: any, update: any): PositionAssignmentUpdate {
    console.log('merging');
    console.dir(formValue);
    console.dir(update);
    return {
      positionAssignmentId: update.positionAssignmentId,
      positionName: update.positionName,
      stateVoterId: update.stateVoterId,
      suborganizationName: update.precinct,
      organizationId: update.organizationId,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      address: formValue.streetAddress,
      houseNumber: update.houseNumber,
      city: update.city == null ? '' : update.city,
      state: update.state == null ? '' : update.state,
      zip: update.zip == null ? '' : update.zip,
      phone: formValue.phone,
      email: formValue.email,
      stateHouse: update.stateHouse,
      stateSenate: update.stateSenate,
      congressional: update.congressional
    }
  }

  ngOnInit() {
    if (this.updateData === null) {
      this.updateData = this.getEmptyUpdate();
    }
    console.log('initializing with data');
    console.dir(this.assignmentUpdate);
    this.initializeForm(this.formBuilder, {
      firstName: this.assignmentUpdate.firstName,
      lastName: this.assignmentUpdate.lastName,
      streetAddress: this.assignmentUpdate.address,
      phone: this.assignmentUpdate.phone,
      email: this.assignmentUpdate.email
    });
  }

  updateAssignment() {
    this.onUpdate.emit(this.mergeData(this.updateForm.value, this.assignmentUpdate));
  }

  //  validations
  emailValidation(e) {
    this.validEmail = this.emailPattern.test(String(e).toLowerCase());
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

  phoneValidation(e) {
    this.validPhone = this.phonePattern.test(String(e));
  }

}
