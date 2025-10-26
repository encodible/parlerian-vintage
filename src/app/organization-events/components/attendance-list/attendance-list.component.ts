import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Attendee} from '../../models/Attendee';
import {OrganizationEvent} from '../../models/OrganizationEvent';


declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-attendance-list',
    templateUrl: './attendance-list.component.html',
    styleUrls: ['./attendance-list.component.scss'],
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, MatButtonModule, MatTooltipModule]
})
export class AttendanceListComponent implements OnInit {

    @Input() attendees: Attendee[];
    @Input() orgEvent: OrganizationEvent;

    cols: any[];

    public selectedAttendees: Attendee[];

    @Output() deselect = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        this.cols = [
            {field: 'precinct', header: 'Precinct'},
            {field: 'lastName', header: 'Last Name'},
            {field: 'firstName', header: 'First Name'},
            {field: 'middleName', header: 'Middle Name'},
            {field: 'congressional', header: 'CD'},
            {field: 'stateSenate', header: 'SD'},
            {field: 'stateHouse', header: 'HD'},
            {field: 'countyCouncil', header: 'CC'}
        ]
    }


    showPersonPopup() {
    }


    editPerson() {
    }


    deletePerson() {
    }

    deselectEvent() {
        this.deselect.emit();
    }

}
