import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-people-action-pad',
  templateUrl: './people-action-pad.component.html',
  styleUrls: ['./people-action-pad.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PeopleActionPadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
