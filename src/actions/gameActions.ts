import {ThunkDispatch} from 'redux-thunk';
import {Multiplication, RootState, Page, Sets, Difficulties} from '../reducers';
import {sets, domain} from '../reducers/gameReducer';
import {
  SET_ROUND_STATE,
  SET_CURRENT_TASK,
  INCREMENT_TIMER,
  SET_TIMER,
  SLICE_TASK,
  SET_ANSWER,
  SET_TASKS,
  SET_SET,
  SET_DIFFICULTY,
  GameActionTypes,
  AppActionTypes,
} from './types';
import {setCurrentPage} from './appActions';
import * as firebase from '../utils/firebase';

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

export function setTasks(tasks: Array<Multiplication>): GameActionTypes {
  return {
    type: SET_TASKS,
    payload: tasks,
  };
}

export function setSet(set: Sets): GameActionTypes {
  return {
    type: SET_SET,
    payload: set,
  };
}

export function setDifficulty(difficulty: Difficulties): GameActionTypes {
  return {
    type: SET_DIFFICULTY,
    payload: difficulty,
  };
}

export function shuffle(arr) {
  const newArray: Multiplication[] = [];
  const incomingArray: Multiplication[] = [...arr];

  while (incomingArray.length > 0) {
    const randomIndex = Math.floor(Math.random() * incomingArray.length);
    newArray.push(incomingArray[randomIndex]);
    incomingArray.splice(randomIndex, 1);
  }

  return newArray;
}

export function generateTasks() {
  return async (
    dispatch: ThunkDispatch<RootState, {}, GameActionTypes | AppActionTypes>,
    getState: () => RootState,
  ) => {
    const {selectedDifficulty, selectedSet} = getState().game;
    let combinations;

    if (selectedDifficulty !== null && selectedSet !== null) {
      const tables: number[] = sets[selectedSet];
      switch (selectedDifficulty) {
        default:
        case Difficulties.beginner:
          combinations = tables.map(t => domain.map(d => [d, t]));
          dispatch(setTasks(combinations.flat()));
          break;
        case Difficulties.intermediate:
          combinations = tables.map(t => shuffle(domain).map(d => [d, t]));
          dispatch(setTasks(combinations.flat()));
          break;
        case Difficulties.advanced:
          combinations = tables.map(t => domain.map(d => [d, t]));
          dispatch(setTasks(shuffle(combinations.flat())));
          break;
      }
    }
  };
}

export function sliceNextTask() {
  return async (
    dispatch: ThunkDispatch<RootState, {}, GameActionTypes | AppActionTypes>,
    getState: () => RootState,
  ) => {
    const {tasks} = getState().game;
    const nextTask = tasks[0];

    dispatch(setCurrentTask(nextTask));
    dispatch(sliceTask(0));
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
      selectedSet,
      selectedDifficulty,
      elapsedTime,
    } = getState().game;
    const {playerName, playerClass} = getState().player;
    const actualAnswer = currentTask[0] * currentTask[1];

    if (answer.length > actualAnswer.toString().length) {
      dispatch(setAnswer(''));
    }

    if (parseInt(answer, 10) === actualAnswer && selectedSet !== null) {
      dispatch(setAnswer(''));
      if (tasks.length > 0) {
        dispatch(sliceNextTask());
      } else {
        dispatch(setCurrentPage(Page.ResultPage));
        firebase
          .saveItem(`${selectedSet}${selectedDifficulty}`, {
            playerName,
            playerClass,
            elapsedTime,
          })
          .then(() => {
            firebase.logEvent('goal_completion', {name: 'completed'});
          });
      }
    }
  };
}

export function resetGame() {
  return async (
    dispatch: ThunkDispatch<RootState, {}, GameActionTypes | AppActionTypes>,
  ) => {
    dispatch(generateTasks());
    dispatch(sliceNextTask());
    dispatch(setTimer(0));
  };
}
