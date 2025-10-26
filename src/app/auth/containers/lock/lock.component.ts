import {Component, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-lock-cmp',
    templateUrl: './lock.component.html',
    standalone: true,
    imports: [CommonModule]
})

export class LockComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    version = environment.version;

    ngOnInit() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('lock-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
    }


    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('lock-page');
        body.classList.remove('off-canvas-sidebar');

    }
}
