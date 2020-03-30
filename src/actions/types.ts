import {Page, Multiplication, Difficulties, Sets} from '../reducers/types';

export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const VALIDATE_PLAYER_NAME = 'VALIDATE_PLAYER_NAME';
export const VALIDATE_PLAYER_CLASS = 'VALIDATE_PLAYER_CLASS';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';
export const SET_TIMER = 'SET_TIMER';
export const SET_PLAYER_NAME = 'SET_PLAYER_NAME';
export const SET_PLAYER_CLASS = 'SET_PLAYER_CLASS';
export const SET_ROUND_STATE = 'SET_ROUND_STATE';
export const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
export const SLICE_TASK = 'SLICE_TASK';
export const SET_ANSWER = 'SET_ANSWER';
export const SET_SET = 'SET_SET';
export const SET_DIFFICULTY = 'SET_DIFFICULTY';
export const SET_TASKS = 'SET_TASKS';

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

interface ValidateClassAction {
  type: typeof VALIDATE_PLAYER_CLASS;
}

interface IncrementTimerAction {
  type: typeof INCREMENT_TIMER;
}

interface SetTimerAction {
  type: typeof SET_TIMER;
  payload: number;
}

interface SetPlayerNameAction {
  type: typeof SET_PLAYER_NAME;
  payload: string;
}

interface SetPlayerClassAction {
  type: typeof SET_PLAYER_CLASS;
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

interface SliceTaskAction {
  type: typeof SLICE_TASK;
  payload: number;
}

interface SetAnswerAction {
  type: typeof SET_ANSWER;
  payload: string;
}

interface SetTasksAction {
  type: typeof SET_TASKS;
  payload: Array<Multiplication>;
}

interface SetSetAction {
  type: typeof SET_SET;
  payload: Sets;
}

interface SetDifficultyAction {
  type: typeof SET_DIFFICULTY;
  payload: Difficulties;
}

export type AppActionTypes = SetCurrentPageAction;
export type PlayerActionTypes =
  | SetPlayerNameAction
  | SetPlayerClassAction
  | ValidateNameAction
  | ValidateClassAction;
export type GameActionTypes =
  | IncrementTimerAction
  | SetTimerAction
  | SetRoundStateAction
  | SetCurrentTaskAction
  | SliceTaskAction
  | SetAnswerAction
  | SetSetAction
  | SetTasksAction
  | SetDifficultyAction;
