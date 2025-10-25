import { Component } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent {
    test: Date = new Date();
    version = environment.version;
}
