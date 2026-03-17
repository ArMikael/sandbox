import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGamesWrapper } from './board-games-wrapper';

describe('BoardGamesWrapper', () => {
  let component: BoardGamesWrapper;
  let fixture: ComponentFixture<BoardGamesWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardGamesWrapper],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardGamesWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
