import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { patchState } from '@ngrx/signals';
import { BoardGame } from '../models/interfaces';
import { computed, inject } from '@angular/core';
import { BoardGamesService } from '../services/board-games.service';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';


export const BoardGamesStore = signalStore(
  { providedIn: 'root' },
  withDevtools('BoardGamesStore'),
  withState({
    boardGamesList: [] as BoardGame[],
    selectedBoardGame: null as BoardGame | null,
  }),
  withMethods((store) => {
    const bgService = inject(BoardGamesService);

    return {
      /* Example of RxJS operators integration inside Signal Store */
      load: rxMethod<number>(
        pipe(
          switchMap((id) => bgService.getBoardGamesList()),
          tap((res) => patchState(store, { boardGamesList: res }))
        )
      ),

      getExistingBoardGames() {
        bgService.getBoardGamesList().subscribe((res) =>
          patchState(store, { boardGamesList: res })
        )
      },

      addBoardGame(boardGame: BoardGame) {
        patchState(store, { boardGamesList: [...store.boardGamesList(), boardGame] });
      },

    }
  }),
  withComputed((state) => {
    return {
      totalBoardGames: computed(() => state.boardGamesList().length)
    }
  })
)

