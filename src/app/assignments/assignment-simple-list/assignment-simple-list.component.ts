import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PositionAssignment} from '../models/PositionAssignment';

@Component({
    selector: 'app-assignment-simple-list',
    templateUrl: './assignment-simple-list.component.html',
    styleUrls: ['./assignment-simple-list.component.scss']
})
export class AssignmentSimpleListComponent implements OnInit {

    @Input()
    assignments: PositionAssignment[] = [];
    @Output()
    onEdit: EventEmitter<PositionAssignment>;
    @Output()
    onDismiss: EventEmitter<PositionAssignment>;

    constructor() {
        this.onEdit = new EventEmitter<PositionAssignment>();
        this.onDismiss = new EventEmitter<PositionAssignment>();
    }

    dismissPosition(assignment) {
        this.onDismiss.emit(assignment)
    }

    editAssignment(assignment) {
        this.onEdit.emit(assignment)
    }

    ngOnInit() {
    }

}
