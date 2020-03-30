import {
  PlayerActionTypes,
  SET_PLAYER_NAME,
  SET_PLAYER_CLASS,
  VALIDATE_PLAYER_NAME,
  VALIDATE_PLAYER_CLASS,
} from '../actions/types';

import {PlayerState} from './types';

export const playerInitialState: PlayerState = {
  playerName: '',
  playerNameValid: false,
  playerNameError: '',
  playerClass: '',
  playerClassValid: false,
  playerClassError: '',
};

const validateName = playerName => {
  let newState = {};
  if (playerName.length > 0) {
    newState = {
      playerNameValid: true,
      playerNameError: '',
    };
  } else {
    newState = {
      playerNameValid: false,
      playerNameError: 'Please enter a valid name!',
    };
  }
  return newState;
};

const validateClass = playerClass => {
  let newState = {};
  if (playerClass.length > 0 && playerClass.length <= 3) {
    newState = {
      playerClassValid: true,
      playerClassError: '',
    };
  } else {
    newState = {
      playerClassValid: false,
      playerClassError: 'Please enter a valid class name!',
    };
  }
  return newState;
};

export function playerReducer(
  state = playerInitialState,
  action: PlayerActionTypes,
) {
  switch (action.type) {
    case SET_PLAYER_NAME:
      return {
        ...state,
        playerName: action.payload,
        playerNameError: '',
      };
    case SET_PLAYER_CLASS:
      return {
        ...state,
        playerClass: action.payload,
        playerClassError: '',
      };
    case VALIDATE_PLAYER_NAME:
      return {
        ...state,
        ...validateName(state.playerName),
      };
    case VALIDATE_PLAYER_CLASS:
      return {
        ...state,
        ...validateClass(state.playerClass),
      };
    default:
      return state;
  }
}
