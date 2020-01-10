import {VALIDATE_PLAYER_NAME, GameActionTypes} from './types';

export function validatePlayerName(): GameActionTypes {
  return {
    type: VALIDATE_PLAYER_NAME,
  };
}
