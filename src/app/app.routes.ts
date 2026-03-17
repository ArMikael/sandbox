import { Routes } from '@angular/router';
import { BoardGamesWrapper } from './components/board-games-wrapper/board-games-wrapper';
import { CarsWrapper } from './components/cars-wrapper/cars-wrapper';

export const routes: Routes = [
  {
    path: 'board-games',
    component: BoardGamesWrapper
  },
  {
    path: 'cars',
    component: CarsWrapper
  }
];
