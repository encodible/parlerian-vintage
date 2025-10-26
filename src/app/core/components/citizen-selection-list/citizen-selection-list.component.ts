import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {CitizenSearchResult} from '../../../people/services/citizen-api.service';

@Component({
  selector: 'app-citizen-selection-list',
  templateUrl: './citizen-selection-list.component.html',
  styleUrls: ['./citizen-selection-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule]
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
