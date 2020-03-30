import {
  SET_PLAYER_NAME,
  VALIDATE_PLAYER_NAME,
  SET_PLAYER_CLASS,
  VALIDATE_PLAYER_CLASS,
  PlayerActionTypes,
} from './types';

export function validatePlayerName(): PlayerActionTypes {
  return {
    type: VALIDATE_PLAYER_NAME,
  };
}

export function setPlayerName(name: string): PlayerActionTypes {
  return {
    type: SET_PLAYER_NAME,
    payload: name,
  };
}

export function validatePlayerClass(): PlayerActionTypes {
  return {
    type: VALIDATE_PLAYER_CLASS,
  };
}

export function setPlayerClass(playerClass: string): PlayerActionTypes {
  return {
    type: SET_PLAYER_CLASS,
    payload: playerClass.toUpperCase(),
  };
}
