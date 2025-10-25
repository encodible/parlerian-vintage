import {Component, OnInit} from '@angular/core';
import {slideInAnimation} from '../../../animations';

@Component({
  selector: 'app-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class PeoplePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
