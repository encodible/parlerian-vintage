import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-district-report',
  templateUrl: './district-report.component.html',
  styleUrls: ['./district-report.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DistrictReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
