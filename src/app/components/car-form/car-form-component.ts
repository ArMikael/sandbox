import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarsService } from '../../services/cars-service';
import { Car, WheelSize } from '../../models/cars.models';

@Component({
  selector: 'app-car-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './car-form-component.html',
  styleUrl: './car-form-component.scss',
})
export class CarFormComponent {
  private carsService = inject(CarsService);

  readonly wheelSizes: WheelSize[] = [14, 15, 16, 17, 18, 19, 20];

  carForm = new FormGroup({
    brand: new FormControl<string>('', Validators.required),
    model: new FormControl<string>('', Validators.required),
    wheelSize: new FormControl<WheelSize | null>(null),
    isElectric: new FormControl<boolean>(false),
    isHybrid: new FormControl<boolean>(false),
  });

  onSubmit(event: SubmitEvent) {
    console.log('Submit: ', event);
    console.log('carForm: ', this.carForm)
    this.carsService.addCar(this.carForm.value as Car);
  }
}
