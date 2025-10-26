import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-assignments-action-pad',
  templateUrl: './assignments-action-pad.component.html',
  styleUrls: ['./assignments-action-pad.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AssignmentsActionPadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
