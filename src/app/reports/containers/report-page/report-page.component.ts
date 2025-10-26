import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PositionReportComponent} from '../position-report/position-report.component';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, PositionReportComponent]
})
export class ReportPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
