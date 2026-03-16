import { signalStore, withMethods, withState } from '@ngrx/signals';
import { patchState } from '@ngrx/signals';
import { BoardGame } from '../models/interfaces';

export const BoardGamesStore = signalStore(
  withState({
    boardGamesList: [] as BoardGame[],
    selectedBoardGame: null as BoardGame | null,
  }),
  withMethods((store) => {
    return {
      countBoardGames() {
        return store.boardGamesList().length;
      },
      addBoardGame(boardGame: BoardGame) {
        patchState(store, { boardGamesList: [...store.boardGamesList(), boardGame] });
      }
    }
  })
)

