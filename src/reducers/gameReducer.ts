import {
  GameActionTypes,
  SET_PLAYER_NAME,
  VALIDATE_PLAYER_NAME,
  SET_CURRENT_TASK,
  SET_ROUND_STATE,
  INCREMENT_TIMER,
  SET_TIMER,
  SLICE_TASK,
  SET_ANSWER,
  RESET_TASKS,
  SET_TABLES,
} from '../actions/types';

import {GameState, Multiplication} from './types';

export const fullSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const easySet = [1, 2, 3, 5, 10];

const getCombinations = selectedTables => {
  const combinations: Array<Multiplication> = [];
  selectedTables.forEach(x => fullSet.forEach(y => combinations.push([x, y])));
  return combinations;
};

export const gameInitialState: GameState = {
  playerName: '',
  playerNameValid: false,
  playerNameError: '',
  selectedTables: easySet,
  roundActive: false,
  elapsedTime: 0,
  tasks: getCombinations(easySet),
  currentTask: [0, 0],
  answer: '',
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

export function gameReducer(state = gameInitialState, action: GameActionTypes) {
  switch (action.type) {
    case SET_PLAYER_NAME:
      return {
        ...state,
        playerName: action.payload,
        playerNameError: '',
      };
    case VALIDATE_PLAYER_NAME:
      return {
        ...state,
        ...validateName(state.playerName),
      };
    case INCREMENT_TIMER:
      return {
        ...state,
        elapsedTime: state.elapsedTime + 1,
      };
    case SET_TIMER:
      return {
        ...state,
        elapsedTime: action.payload,
      };
    case SET_ROUND_STATE:
      return {
        ...state,
        roundActive: action.payload,
      };
    case SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload,
      };
    case SLICE_TASK:
      const newTasksList = [...state.tasks];
      newTasksList.splice(action.payload, 1);
      return {
        ...state,
        tasks: newTasksList,
      };
    case SET_ANSWER:
      return {
        ...state,
        answer: action.payload,
      };
    case RESET_TASKS:
      return {
        ...state,
        tasks: getCombinations(state.selectedTables),
      };
    case SET_TABLES:
      const newTables = action.payload.split(',').map(str => parseInt(str, 10));
      return {
        ...state,
        selectedTables: newTables,
        tasks: getCombinations(newTables),
      };
    default:
      return state;
  }
}
