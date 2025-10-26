import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {AllocationReport} from '../../models/AllocationReport';

@Component({
    selector: 'app-missing-positions',
    templateUrl: './missing-positions.component.html',
    styleUrls: ['./missing-positions.component.scss'],
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule]
})
export class MissingPositionsComponent implements OnInit {

    _allocations: AllocationReport[];

    selectedAllocations: AllocationReport[];

    cols: any[];

    @Input()
    set allocations(allocations: AllocationReport[]) {
        this._allocations = allocations.filter(allocation => allocation.missingPositions > 0)
    }

    constructor() {
    }

    ngOnInit() {
        this.cols = [
            {field: 'commonName', header: 'Suborganization'},
            {field: 'positionName', header: 'Position'},
            {field: 'missingPositions', header: 'Missing Positions'},
            {field: 'allocatedCount', header: 'Allocated'},
            {field: 'electedCount', header: 'Elected'}
        ]
    }

}
