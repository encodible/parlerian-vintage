import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-footer-cmp',
    templateUrl: 'footer.component.html',
    standalone: true,
    imports: [CommonModule]
})

export class FooterComponent {
    test: Date = new Date();
    version = environment.version;
}
