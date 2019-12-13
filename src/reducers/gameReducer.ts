import {
  GameActionTypes,
  SET_PLAYER_NAME,
  VALIDATE_PLAYER_NAME,
  SET_CURRENT_TASK,
  SET_ROUND_STATE
} from "../actions/types";

import { GameState, Multiplication } from ".";

const combinators = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const tables = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let combinations: Array<Multiplication> = [];
tables.forEach(x => combinators.forEach(y => combinations.push([x, y])));

export const initialState: GameState = {
  playerName: "",
  playerNameValid: false,
  playerNameError: "",
  selectedTables: tables,
  roundActive: false,
  elapsedTime: 0,
  tasks: combinations,
  currentTask: []
};

const validateName = playerName => {
  if (playerName.length > 0) {
    return {
      playerNameValid: true,
      playerNameError: ""
    };
  } else {
    return {
      playerNameValid: false,
      playerNameError: "Please enter a valid name!"
    };
  }
};

export function gameReducer(state = initialState, action: GameActionTypes) {
  switch (action.type) {
    case SET_PLAYER_NAME:
      return {
        ...state,
        playerName: action.payload,
        playerNameError: ""
      };
    case VALIDATE_PLAYER_NAME:
      return {
        ...state,
        ...validateName(state.playerName)
      };
    case SET_ROUND_STATE:
      return {
        ...state,
        roundActive: action.payload
      };
    case SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload
      };

    default:
      return state;
  }
}
