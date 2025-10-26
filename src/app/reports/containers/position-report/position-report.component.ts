import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {PositionService} from '../../../assignments/services/position.service';
import {PositionDto} from '../../../assignments';
import {Observable} from 'rxjs';
import {saveAs} from 'file-saver';
import moment from 'moment';
import {PositionReportSelectorComponent} from '../../components/position-report-selector/position-report-selector.component';

@Component({
    selector: 'app-position-report',
    templateUrl: './position-report.component.html',
    styleUrls: ['./position-report.component.scss'],
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule, PositionReportSelectorComponent]
})
export class PositionReportComponent implements OnInit {

    positions: PositionDto[] = []
    positions$: Observable<PositionDto[]>
    loading = false

    constructor(private positionService: PositionService) {
        this.positions$ = positionService.getPositions()
    }

    ngOnInit() {
        this.positionService.getPositions()
            .subscribe(positions => {
                this.positions = positions
            })
    }

    downloadPositionReport($event) {
        this.loading = true
        console.log('Downloading position report for ', $event)
        this.positionService.getPositionReport($event)
            .subscribe(
                (csv => {
                    this.loading = false;
                    saveAs(csv, `position_report_${$event.name}_${moment.now()}.csv`)
                    // const downloadUrl = URL.createObjectURL(csv)
                    // const a = document.createElement('a')
                    // a.href = downloadUrl
                    // a.download = 'position_report.csv'
                    // a.click()
                    // setTimeout(() => {
                    //     URL.revokeObjectURL(downloadUrl)
                    // }, 1000)
                }),
                (err) => {
                    console.error(err)
                    this.loading = false;
                }
            )
    }


}
