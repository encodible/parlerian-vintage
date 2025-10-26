import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CitizenQuickSearchForm} from '../../../people/services/citizen-api.service';
import {FieldErrorDisplayComponent} from '../field-error-display/field-error-display.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, FieldErrorDisplayComponent]
})
export class QuickSearchComponent implements OnInit {

  quickSearch: FormGroup;

  namePattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  houseNumberPattern = /^\d{1,10}$/;

  validFirstThree = false;
  validStreetHouseNumber = false;

  @Output('onSearch')
  onSearch = new EventEmitter<CitizenQuickSearchForm>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.quickSearch = this.formBuilder.group({
      firstThree: ['', [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(20)]],
      streetHouseNumber: ['', [Validators.required, Validators.pattern(this.houseNumberPattern)]],
    })
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  onSearchClicked(e) {
    e.preventDefault();
    if (this.quickSearch.valid) {
      const formValue = this.quickSearch.value;
      this.onSearch.emit({
        firstThree: formValue.firstThree,
        houseNumber: formValue.streetHouseNumber
      });
    } else {
      swal({
        title: 'Search error',
        text: 'Search failed. Check form inputs',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-info'
      }).catch(swal.noop)
    }
  }

  firstThreeValidation(e) {
    this.validFirstThree = this.namePattern.test(String(e))
  }

  streetHouseNumberValidation(e) {
    this.validStreetHouseNumber = this.houseNumberPattern.test(String(e))
  }


}
