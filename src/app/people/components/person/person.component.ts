import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PersonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
