import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
    imports: [ RouterModule, CommonModule, MatButtonModule, NavbarComponent ],
    declarations: [],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
