import { Component } from '@angular/core';
import {BoardGamesListComponent} from '../board-games-list/board-games-list.component';
import {SignalForm} from '../signal-form/signal-form';

@Component({
  selector: 'app-board-games-wrapper',
  imports: [
    BoardGamesListComponent,
    SignalForm
  ],
  templateUrl: './board-games-wrapper.html',
  styleUrl: './board-games-wrapper.scss',
})
export class BoardGamesWrapper {}
