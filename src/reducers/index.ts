import {combineReducers} from 'redux';
import {appReducer} from './appReducer';
import {gameReducer} from './gameReducer';
import {playerReducer} from './playerReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  game: gameReducer,
  player: playerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export * from './types';
