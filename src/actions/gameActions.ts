import {ThunkDispatch} from 'redux-thunk';
import {Multiplication, RootState, Page} from '../reducers';
import {
  SET_PLAYER_NAME,
  SET_ROUND_STATE,
  SET_CURRENT_TASK,
  INCREMENT_TIMER,
  SET_TIMER,
  SLICE_TASK,
  SET_ANSWER,
  RESET_TASKS,
  SET_TABLES,
  GameActionTypes,
  AppActionTypes,
} from './types';
import {setCurrentPage} from './appActions';
import * as firebase from '../utils/firebase';

export function setPlayerName(name: string): GameActionTypes {
  return {
    type: SET_PLAYER_NAME,
    payload: name,
  };
}

export function incrementTimer(): GameActionTypes {
  return {
    type: INCREMENT_TIMER,
  };
}

export function setTimer(time: number): GameActionTypes {
  return {
    type: SET_TIMER,
    payload: time,
  };
}

export function setRoundState(state: boolean): GameActionTypes {
  return {
    type: SET_ROUND_STATE,
    payload: state,
  };
}

export function setCurrentTask(task: Multiplication): GameActionTypes {
  return {
    type: SET_CURRENT_TASK,
    payload: task,
  };
}

export function sliceTask(index: number): GameActionTypes {
  return {
    type: SLICE_TASK,
    payload: index,
  };
}

export function setAnswer(answer: string): GameActionTypes {
  return {
    type: SET_ANSWER,
    payload: answer,
  };
}

export function resetTasks(): GameActionTypes {
  return {
    type: RESET_TASKS,
  };
}

export function setTables(tables: string): GameActionTypes {
  return {
    type: SET_TABLES,
    payload: tables,
  };
}

export function sliceNextRandomTask() {
  return async (
    dispatch: ThunkDispatch<RootState, {}, GameActionTypes | AppActionTypes>,
    getState: () => RootState,
  ) => {
    const {tasks} = getState().game;
    const randomIndex = Math.floor(Math.random() * tasks.length);

    dispatch(setCurrentTask(tasks[randomIndex]));
    dispatch(sliceTask(randomIndex));
  };
}

export function checkAnswer() {
  return async (
    dispatch: ThunkDispatch<RootState, {}, GameActionTypes | AppActionTypes>,
    getState: () => RootState,
  ) => {
    const {
      answer,
      currentTask,
      tasks,
      selectedTables,
      playerName,
      elapsedTime,
    } = getState().game;
    const actualAnswer = currentTask[0] * currentTask[1];

    if (answer.length > actualAnswer.toString().length) {
      dispatch(setAnswer(''));
    }

    if (parseInt(answer, 10) === actualAnswer) {
      dispatch(setAnswer(''));
      if (tasks.length > 0) {
        dispatch(sliceNextRandomTask());
      } else {
        firebase
          .saveItem(selectedTables.toString(), {
            playerName,
            elapsedTime,
          })
          .then(() => {
            firebase.logEvent('goal_completion', {name: 'completed'});
            dispatch(setCurrentPage(Page.ResultPage));
          });
      }
    }
  };
}

export function resetGame() {
  return async (
    dispatch: ThunkDispatch<RootState, {}, GameActionTypes | AppActionTypes>,
  ) => {
    dispatch(resetTasks());
    dispatch(sliceNextRandomTask());
    dispatch(setTimer(0));
  };
}
