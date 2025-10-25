import {Component, Input, OnInit} from '@angular/core';
import {PositionAssignment} from '../../models/PositionAssignment';
import moment from 'moment';


@Component({
    selector: 'app-assignment-list',
    templateUrl: './assignment-list.component.html',
    styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent implements OnInit {

    _assignmentList: PositionAssignment[];

    selectedAssignments: PositionAssignment[];

    cols: any[];


    @Input()
    set assignmentList(assignmentList: PositionAssignment[]) {
        this._assignmentList = assignmentList.map(formatDates);
    }

    constructor() {
    }

    ngOnInit() {
        this.cols = [
            {field: 'assignedSuborganization', header: 'Suborganization'},
            {field: 'positionName', header: 'Position'},
            {field: 'firstName', header: 'First'},
            {field: 'lastName', header: 'Last'},
            {field: 'startDateTime', header: 'Start Date'},
            {field: 'congressional', header: 'CD'},
            {field: 'stateSenate', header: 'SD'},
            {field: 'stateHouse', header: 'HD'},
            {field: 'countyCouncil', header: 'CC'},
            {field: 'precinct', header: 'Precinct'},
        ]
    }


    showAssignmentPopup() {
    }


    editAssignment() {
    }


    deleteAssignment() {
    }

}

function formatDates(assignment: PositionAssignment): PositionAssignment {
    const tableFormat = 'YYYY/MM/DD';
    return {
        positionId: assignment.positionId,
        personId: assignment.personId,
        positionAssignmentId: assignment.positionAssignmentId,
        positionName: assignment.positionName,
        assignedSuborganization: assignment.assignedSuborganization,
        assignedSuborganizationId: assignment.assignedSuborganizationId,
        organizationId: assignment.organizationId,
        lastName: assignment.lastName,
        firstName: assignment.firstName,
        middleName: assignment.middleName,
        congressional: assignment.congressional,
        stateSenate: assignment.stateSenate,
        stateHouse: assignment.stateHouse,
        countyCouncil: assignment.countyCouncil,
        precinct: assignment.precinct,
        startDateTime: moment(assignment.startDateTime).format(tableFormat),
        endDateTime: moment(assignment.endDateTime).format(tableFormat),
        address: assignment.address,
        email: assignment.email,
        phone: assignment.phone
    }
}
