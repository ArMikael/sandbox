export type WheelSize = 14 | 15 | 16 | 17 | 18 | 19 | 20;

export interface Car {
  brand: string;
  model: string;
  wheelSize?: number;
  isElectric: boolean;
  isHybrid: boolean;
}
