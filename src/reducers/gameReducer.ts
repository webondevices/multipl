import {
  GameActionTypes,
  SET_CURRENT_TASK,
  SET_ROUND_STATE,
  INCREMENT_TIMER,
  SET_TIMER,
  SLICE_TASK,
  SET_ANSWER,
  SET_TASKS,
  SET_SET,
  SET_DIFFICULTY,
} from '../actions/types';

import {GameState, Sets} from './types';

export const sets = {
  [Sets.red]: [0, 1, 2, 5, 10],
  [Sets.orange]: [0, 1, 2, 4, 8],
  [Sets.yellow]: [0, 1, 2, 3, 6],
  [Sets.green]: [3, 4, 5, 6, 8, 12],
  [Sets.blue]: [7, 8, 9, 10, 11, 12],
  [Sets.indigo]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

export const domain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const gameInitialState: GameState = {
  selectedSet: null,
  selectedDifficulty: null,
  roundActive: false,
  elapsedTime: 0,
  tasks: [],
  currentTask: [0, 0],
  answer: '',
};

export function gameReducer(state = gameInitialState, action: GameActionTypes) {
  switch (action.type) {
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
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case SET_SET:
      return {
        ...state,
        selectedSet: action.payload,
      };
    case SET_DIFFICULTY:
      return {
        ...state,
        selectedDifficulty: action.payload,
      };
    default:
      return state;
  }
}
