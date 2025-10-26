import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatRippleModule]
})

export class ButtonsComponent {}
