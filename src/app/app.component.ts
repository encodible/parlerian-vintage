import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {slideInAnimation} from './animations';


@Component({
    selector: 'app-my-app',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet],
    animations: [
        slideInAnimation
    ]
})

export class AppComponent implements OnInit {

    constructor() {}

    ngOnInit() {
    }

    prepareRouter(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
