import {Component, inject, OnInit} from '@angular/core';
import {Car} from '../../models/cars.models';
import {CarsService} from '../../services/cars-service';

@Component({
  selector: 'app-car-list',
  imports: [],
  templateUrl: './car-list-component.html',
  styleUrl: './car-list-component.scss',
})
export class CarListComponent implements OnInit {
  private carsService = inject(CarsService);

  carsList: Car[] = [];

  ngOnInit() {
    this.carsService.getCars().subscribe(cars => {
      this.carsList = cars;
    })
  }
}
