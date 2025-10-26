import { Component, OnInit, OnDestroy } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-pricing-cmp',
    templateUrl: './pricing.component.html',
    standalone: true,
    imports: [CommonModule]
})

export class PricingComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    ngOnInit() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('pricing-page');
      body.classList.add('off-canvas-sidebar');
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('pricing-page');
      body.classList.remove('off-canvas-sidebar');
    }
}
