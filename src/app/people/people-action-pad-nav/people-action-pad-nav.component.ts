import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-people-action-pad-nav',
  templateUrl: './people-action-pad-nav.component.html',
  styleUrls: ['./people-action-pad-nav.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PeopleActionPadNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
