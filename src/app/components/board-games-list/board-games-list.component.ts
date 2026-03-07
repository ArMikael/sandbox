import { Component, OnInit, inject, signal } from '@angular/core';
import { BoardGamesService } from '../../services/board-games.service';
import { BoardGame } from '../../models/interfaces';

@Component({
  selector: 'app-board-games-list',
  imports: [],
  templateUrl: './board-games-list.component.html',
  styleUrl: './board-games-list.component.scss',
})
export class BoardGamesListComponent implements OnInit {
  private boardGamesService = inject(BoardGamesService);
  boardGamesList = signal<Array<BoardGame>>([]);

  ngOnInit(): void {
    this.boardGamesService.getBoardGamesList().subscribe((boardGames) => {
      this.boardGamesList.set(boardGames);
    });
  }
}
