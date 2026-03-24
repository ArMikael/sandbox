import { Component } from '@angular/core';
import {BoardGamesListComponent} from '../board-games-list/board-games-list.component';
import {BoardGameForm} from '../board-game-form/board-game-form';

@Component({
  selector: 'app-board-games-wrapper',
  imports: [
    BoardGamesListComponent,
    BoardGameForm
  ],
  templateUrl: './board-games-wrapper.html',
  styleUrl: './board-games-wrapper.scss',
})
export class BoardGamesWrapper {}
