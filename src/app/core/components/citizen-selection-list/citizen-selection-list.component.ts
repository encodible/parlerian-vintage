import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CitizenSearchResult} from '../../../people/services/citizen-api.service';

@Component({
  selector: 'app-citizen-selection-list',
  templateUrl: './citizen-selection-list.component.html',
  styleUrls: ['./citizen-selection-list.component.scss']
})
export class CitizenSelectionListComponent implements OnInit {

  @Input()
  searchResults: CitizenSearchResult[];
  @Output()
  onSelect: EventEmitter<CitizenSearchResult> = new EventEmitter<CitizenSearchResult>();

  constructor() { }

  ngOnInit() {
  }

  selectResult($event) {
    this.onSelect.emit($event)
  }

}
