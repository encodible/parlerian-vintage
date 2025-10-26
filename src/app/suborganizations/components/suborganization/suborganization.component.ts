import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-suborganization',
  templateUrl: './suborganization.component.html',
  styleUrls: ['./suborganization.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SuborganizationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
