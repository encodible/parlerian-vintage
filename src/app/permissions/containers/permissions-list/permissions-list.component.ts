import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PermissionsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
