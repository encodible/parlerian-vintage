import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {slideInAnimation} from '../../../animations';

@Component({
  selector: 'app-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    slideInAnimation
  ]
})
export class PeoplePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
