export type VehicleType = 'car' | 'truck';

export interface Vehicle {
  readonly type: VehicleType;
  drive(): string;
}

export class Car implements Vehicle {
  readonly type: VehicleType = 'car';

  drive() {
    return 'Driving a car';
  }
}

export class Truck implements Vehicle {
  readonly type: VehicleType = 'truck';

  drive() {
    return 'Driving a truck';
  }
}

export class VehicleFactory {
  create(type: VehicleType): Vehicle {
    switch (type) {
      case 'car':
        return new Car();
      case 'truck':
        return new Truck();
    }
  }
}

const factory = new VehicleFactory();
const tesla = factory.create('car');
tesla.drive();
