import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGameForm } from './board-game-form';

describe('BoardGameForm', () => {
  let component: BoardGameForm;
  let fixture: ComponentFixture<BoardGameForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardGameForm],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardGameForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
