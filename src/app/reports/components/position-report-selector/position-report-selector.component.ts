import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PositionDto} from '../../../assignments';

@Component({
    selector: 'app-position-report-selector',
    templateUrl: './position-report-selector.component.html',
    styleUrls: ['./position-report-selector.component.scss']
})
export class PositionReportSelectorComponent implements OnInit {

    @Input()
    positions: PositionDto[]

    selectedPosition: PositionDto

    @Output()
    onSelect: EventEmitter<PositionDto>

    constructor() {
        this.onSelect = new EventEmitter<PositionDto>()
    }

    ngOnInit() {
    }

    selectPosition($event) {
        console.log('Selecting position', $event)
        this.onSelect.emit($event)
    }


}
