import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGamesListComponent } from './board-games-list.component';

describe('BoardGamesList', () => {
  let component: BoardGamesListComponent;
  let fixture: ComponentFixture<BoardGamesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardGamesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardGamesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
