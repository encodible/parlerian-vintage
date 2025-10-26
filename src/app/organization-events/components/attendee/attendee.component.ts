import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AttendeeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
