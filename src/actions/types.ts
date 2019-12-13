import { Page, Multiplication } from "../reducers/types";

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const VALIDATE_PLAYER_NAME = "VALIDATE_PLAYER_NAME";
export const SET_PLAYER_NAME = "SET_PLAYER_NAME";
export const SET_ROUND_STATE = "SET_ROUND_STATE";
export const SET_CURRENT_TASK = "SET_CURRENT_TASK";

interface SetCurrentPageAction {
  type: typeof SET_CURRENT_PAGE;
  payload: Page;
}

interface SetCurrentPageAction {
  type: typeof SET_CURRENT_PAGE;
  payload: Page;
}

interface ValidateNameAction {
  type: typeof VALIDATE_PLAYER_NAME;
}

interface SetPlayerNameAction {
  type: typeof SET_PLAYER_NAME;
  payload: string;
}

interface SetRoundStateAction {
  type: typeof SET_ROUND_STATE;
  payload: boolean;
}

interface SetCurrentTaskAction {
  type: typeof SET_CURRENT_TASK;
  payload: Multiplication;
}

export type AppActionTypes = SetCurrentPageAction;
export type GameActionTypes =
  | SetPlayerNameAction
  | ValidateNameAction
  | SetRoundStateAction
  | SetCurrentTaskAction;
