import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';

@NgModule({
    imports: [ RouterModule, CommonModule, FooterComponent ],
    declarations: [],
    exports: [ FooterComponent ]
})

export class FooterModule {}
