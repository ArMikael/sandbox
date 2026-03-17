import { Component } from '@angular/core';
import { CarListComponent } from '../car-list/car-list-component';
import { CarFormComponent } from '../car-form/car-form-component';

@Component({
  selector: 'app-cars-wrapper',
  imports: [
    CarListComponent,
    CarFormComponent
  ],
  templateUrl: './cars-wrapper.html',
  styleUrl: './cars-wrapper.scss',
})
export class CarsWrapper {}
