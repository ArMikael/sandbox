import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsWrapper } from './cars-wrapper';

describe('CarsWrapper', () => {
  let component: CarsWrapper;
  let fixture: ComponentFixture<CarsWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsWrapper],
    }).compileComponents();

    fixture = TestBed.createComponent(CarsWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
