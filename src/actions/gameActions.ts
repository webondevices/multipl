import { Page, Multiplication } from "../reducers";
import {
  SET_PLAYER_NAME,
  SET_ROUND_STATE,
  SET_CURRENT_TASK,
  VALIDATE_PLAYER_NAME,
  GameActionTypes
} from ".";

export function setPlayerName(name: string): GameActionTypes {
  return {
    type: SET_PLAYER_NAME,
    payload: name
  };
}

export function validatePlayerName(): GameActionTypes {
  return {
    type: VALIDATE_PLAYER_NAME
  };
}

export function setRoundState(state: boolean): GameActionTypes {
  return {
    type: SET_ROUND_STATE,
    payload: state
  };
}

export function setCurrentTask(task: Multiplication): GameActionTypes {
  return {
    type: SET_CURRENT_TASK,
    payload: task
  };
}
