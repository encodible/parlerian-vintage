import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {
    test: Date = new Date();


    ngOnInit() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('not-found-page');
        body.classList.add('off-canvas-sidebar');
    }


    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('not-found-page');
        body.classList.remove('off-canvas-sidebar');
    }
}
