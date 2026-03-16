import { Component, OnInit, inject, signal } from '@angular/core';
import { BoardGamesService } from '../../services/board-games.service';
import { BoardGame } from '../../models/interfaces';
import { BoardGamesStore } from '../../stores/board-games.store';

@Component({
  selector: 'app-board-games-list',
  standalone: true,
  imports: [],
  templateUrl: './board-games-list.component.html',
  styleUrl: './board-games-list.component.scss',
})
export class BoardGamesListComponent {
  private boardGamesService = inject(BoardGamesService);
  /* Bringing data using NgRx Signal Store */
  bgStore = inject(BoardGamesStore);

  /* Bringing data using the service */
  // this.boardGamesService.getBoardGamesList().subscribe((boardGames) => {
  //   this.boardGamesList.set(boardGames);
  // });
}
