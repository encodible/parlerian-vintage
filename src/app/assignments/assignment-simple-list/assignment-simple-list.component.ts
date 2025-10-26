import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PositionAssignment} from '../models/PositionAssignment';

@Component({
    selector: 'app-assignment-simple-list',
    templateUrl: './assignment-simple-list.component.html',
    styleUrls: ['./assignment-simple-list.component.scss'],
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatTooltipModule]
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
