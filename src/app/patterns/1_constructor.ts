export class Vehicle {
  private readonly _wheels;
  private readonly _brand: string;
  private readonly _model: string;

  constructor(
    private brand: string,
    private model: string,
    private wheels: number = 4,
  ) {
    this._brand = brand;
    this._model = model;
    this._wheels = wheels;
  }

  getDetails() {
    return `The car is ${this._brand} - ${this._model} with ${this._wheels} wheels.`;
  }
}

const tesla = new Vehicle('Tesla', 'Model 3');
console.log(tesla.getDetails());
