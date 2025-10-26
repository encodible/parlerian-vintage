import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'app-organization-events-page',
    templateUrl: './organization-events-page.component.html',
    styleUrls: ['./organization-events-page.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class OrganizationEventsPageComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

}
