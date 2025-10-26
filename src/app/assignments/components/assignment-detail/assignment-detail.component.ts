import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Location} from '@angular/common';
import {AssignmentsService} from '../../services/assignments.service';
import {PositionAssignmentUpdate} from '../../position-assignments';
import {AssignmentUpdateFormComponent} from '../../assignment-update-form/assignment-update-form.component';

@Component({
    selector: 'app-assignment-detail',
    templateUrl: './assignment-detail.component.html',
    styleUrls: ['./assignment-detail.component.scss'],
    standalone: true,
    imports: [CommonModule, AssignmentUpdateFormComponent]
})
export class AssignmentDetailComponent implements OnInit {

    updateData: PositionAssignmentUpdate;

    constructor(
        private assignmentsService: AssignmentsService,
        private location: Location
    ) {
        this.clearAssignment();
    }

    clearAssignment() {
        this.updateData = {
            positionAssignmentId: 0,
            positionName: '',
            stateVoterId: 0,
            suborganizationName: '',
            organizationId: 0,
            firstName: '',
            lastName: '',
            address: '',
            houseNumber: 0,
            city: '',
            state: '',
            zip: '',
            phone: '',
            email: '',
            stateHouse: 0,
            stateSenate: 0,
            congressional: 0
        }
    }

    ngOnInit() {
        this.updateData = this.assignmentsService.getAssignmentUpdateData();
    }

    updateAssignment($event) {
        console.log(`Updating assignment ${JSON.stringify($event)}`);
        this.assignmentsService.updateAssignment($event)
            .subscribe(() => {
                    console.log('updated assignment');
                    this.clearAssignment();
                    this.location.back();
                },
                () => {
                    console.log('updated assignment failed');
                })
    }

}
