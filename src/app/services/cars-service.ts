import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from '../models/cars.models';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  carsList = new BehaviorSubject<Car[]>([

  ]);

  getCars(): Observable<Car[]> {
    return this.carsList.asObservable();
  }

  addCar(car: Car): void {
    const currentCars = this.carsList.getValue();
    const updatedCars = [...currentCars, car];
    this.carsList.next(updatedCars);
  }
}
