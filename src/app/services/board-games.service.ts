import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BoardGame } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoardGamesService {

  getBoardGamesList(): Observable<Array<BoardGame>> {
    return of([
      {
        title: `Railroad Tiles Collector's Edition`,
        publisher: 'Horrible Guild',
        designer: 'Hjalmar Hach, Lorenzo Silva',
        artist: 'Francesco De Benedittis, Marta Tranquilli',
        url: 'https://boardgamegeek.com/boardgame/429717/railroad-tiles-collectors-edition',
        year: 2025
      },
      {
        title: 'Beast',
        publisher: 'Studio Midhall',
        designer: 'Aron Midhall, Elon Midhall, Assar Pettersson',
        artist: 'Aron Midhall',
        url: 'http://boardgamegeek.com/boardgame/281549/beast',
        year: 2023
      }
    ]);
  }
}
