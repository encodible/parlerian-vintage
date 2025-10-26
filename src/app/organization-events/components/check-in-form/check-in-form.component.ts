import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-check-in-form',
  templateUrl: './check-in-form.component.html',
  styleUrls: ['./check-in-form.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CheckInFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
