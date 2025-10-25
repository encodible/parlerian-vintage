import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NameSearchForm} from '../../../people/services/citizen-api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-name-search',
  templateUrl: './name-search.component.html',
  styleUrls: ['./name-search.component.scss']
})
export class NameSearchComponent implements OnInit {

  assignmentSearch: FormGroup;

  namePattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;

  validFirstName = false;
  validLastName = false;

  @Output('onSearch')
  onSearch = new EventEmitter<NameSearchForm>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.assignmentSearch = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.pattern(this.namePattern), Validators.maxLength(20)]],
    })
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  onSearchClicked(e) {
    e.preventDefault();
    if (this.assignmentSearch.valid) {
      const formValue = this.assignmentSearch.value;
      this.onSearch.emit({
        firstName: formValue.firstName,
        lastName: formValue.lastName
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

  firstNameValidation(e) {
    this.validFirstName = this.namePattern.test(String(e))
  }

  lastNameValidation(e) {
    this.validLastName = this.namePattern.test(String(e))
  }



}
