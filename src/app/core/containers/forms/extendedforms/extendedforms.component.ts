import { Component, OnInit, ElementRef } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, DateAdapter} from '@angular/material/core';
import {MatRippleModule} from '@angular/material/core';
import {NouisliderModule} from 'ng2-nouislider';


declare const require: any;

declare const $: any;

@Component({
    selector: 'app-extendedforms-cmp',
    templateUrl: 'extendedforms.component.html',
    styles: [`md-calendar {
      width: 300px;
  }`],
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatRippleModule, NouisliderModule]
})

export class ExtendedFormsComponent implements OnInit {
    simpleSlider = 40;
    doubleSlider = [20, 60];

    regularItems = ['Pizza', 'Pasta', 'Parmesan'];
    touch: boolean;

    selectedValue: string;
    currentCity: string[];

    selectTheme = 'primary';
    cities = [
      {value: 'paris-0', viewValue: 'Paris'},
      {value: 'miami-1', viewValue: 'Miami'},
      {value: 'bucharest-2', viewValue: 'Bucharest'},
      {value: 'new-york-3', viewValue: 'New York'},
      {value: 'london-4', viewValue: 'London'},
      {value: 'barcelona-5', viewValue: 'Barcelona'},
      {value: 'moscow-6', viewValue: 'Moscow'},
    ];

    startDate = new Date();

    ngOnInit() {}
        myFunc(val: any) {
        }
}
