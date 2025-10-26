import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-reports-action-pad',
  templateUrl: './reports-action-pad.component.html',
  styleUrls: ['./reports-action-pad.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ReportsActionPadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
