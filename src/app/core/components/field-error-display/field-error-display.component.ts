import { Component, OnInit, Input } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FieldErrorDisplayComponent {

  @Input() errorMsg: string;
  @Input() displayError: boolean;

}
