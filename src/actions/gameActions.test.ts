import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  Multiplication,
  Sets,
  Difficulties,
  RootState,
  GameState,
  PlayerState,
  Page,
} from '../reducers';
import {
  incrementTimer,
  setTimer,
  setRoundState,
  setCurrentTask,
  sliceTask,
  setAnswer,
  setTasks,
  setSet,
  setDifficulty,
  sliceNextTask,
  shuffle,
  checkAnswer,
  setCurrentPage,
  resetGame,
  INCREMENT_TIMER,
  SET_TIMER,
  SET_ROUND_STATE,
  SET_CURRENT_TASK,
  SLICE_TASK,
  SET_ANSWER,
  SET_TASKS,
  SET_SET,
  SET_DIFFICULTY,
} from '.';
import {expectedOutput} from './expectedOutput';

jest.mock('../utils/firebase');

test("creates the 'incrementTimer' action", () => {
  const action = incrementTimer();

  expect(action).toEqual({
    type: INCREMENT_TIMER,
  });
});

test("creates the 'setTimer' action", () => {
  const value = 123;
  const action = setTimer(value);

  expect(action).toEqual({
    type: SET_TIMER,
    payload: value,
  });
});

test("creates the 'setRoundState' action", () => {
  const value = true;
  const action = setRoundState(value);

  expect(action).toEqual({
    type: SET_ROUND_STATE,
    payload: value,
  });
});

test("creates the 'setCurrentTask' action", () => {
  const value: Multiplication = [1, 2];
  const action = setCurrentTask(value);

  expect(action).toEqual({
    type: SET_CURRENT_TASK,
    payload: value,
  });
});

test("creates the 'sliceTask' action", () => {
  const value = 1;
  const action = sliceTask(value);

  expect(action).toEqual({
    type: SLICE_TASK,
    payload: value,
  });
});

test("creates the 'setAnswer' action", () => {
  const value = '1';
  const action = setAnswer(value);

  expect(action).toEqual({
    type: SET_ANSWER,
    payload: value,
  });
});

test("creates the 'setTasks' action", () => {
  const value: Multiplication[] = [
    [1, 0],
    [0, 1],
  ];
  const action = setTasks(value);

  expect(action).toEqual({
    type: SET_TASKS,
    payload: value,
  });
});

test("creates the 'setSet' action", () => {
  const value = Sets.red;
  const action = setSet(value);

  expect(action).toEqual({
    type: SET_SET,
    payload: value,
  });
});

test("creates the 'setDifficulty' action", () => {
  const value = Difficulties.beginner;
  const action = setDifficulty(value);

  expect(action).toEqual({
    type: SET_DIFFICULTY,
    payload: value,
  });
});

test('shuffle()', async () => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
  const inputArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  expect(shuffle(inputArray)).toEqual([5, 4, 6, 3, 7, 2, 8, 1, 9, 0]);
  (global.Math.random as any).mockRestore();
});

test('slices next task', async () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  getState.mockReturnValueOnce({
    game: {
      tasks: [
        [1, 1],
        [2, 2],
        [3, 3],
      ],
    },
  });

  await sliceNextTask()(dispatch, getState);

  expect(dispatch).toHaveBeenNthCalledWith(1, setCurrentTask([1, 1]));
  expect(dispatch).toHaveBeenNthCalledWith(2, sliceTask(0));
});

test('slice next task if game not finished and answer correct', async () => {
  const state = {
    game: {
      answer: '16',
      currentTask: [4, 4],
      tasks: [
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      selectedSet: Sets.red,
      selectedDifficulty: Difficulties.beginner,
      elapsedTime: 99,
    } as GameState,
    player: {
      playerName: 'Maya',
      playerClass: '3D',
    } as PlayerState,
  };

  const store: any = configureStore<Partial<RootState>>([thunk])(state);
  await store.dispatch(checkAnswer());

  expect(store.getActions()).toEqual([
    setAnswer(''),
    setCurrentTask([1, 1]),
    sliceTask(0),
  ]);
});

test('clear answer if answer longer than solution', async () => {
  const state = {
    game: {
      answer: '10',
      currentTask: [2, 2],
      tasks: [[1, 1]],
      selectedSet: Sets.red,
      selectedDifficulty: Difficulties.beginner,
      elapsedTime: 99,
    } as GameState,
    player: {
      playerName: 'Maya',
      playerClass: '3D',
    } as PlayerState,
  };

  const store: any = configureStore<Partial<RootState>>([thunk])(state);
  await store.dispatch(checkAnswer());

  expect(store.getActions()).toEqual([setAnswer('')]);
});

test('progress to result page if all tasks cleared', async () => {
  const state = {
    game: {
      answer: '4',
      currentTask: [2, 2],
      tasks: [],
      selectedSet: Sets.red,
      selectedDifficulty: Difficulties.beginner,
      elapsedTime: 99,
      roundActive: false,
    } as GameState,
    player: {
      playerName: 'Maya',
      playerClass: '3D',
    } as PlayerState,
  };

  const store: any = configureStore<Partial<RootState>>([thunk])(state);
  await store.dispatch(checkAnswer());

  expect(store.getActions()).toEqual([
    setAnswer(''),
    setCurrentPage(Page.ResultPage),
  ]);
});

test('reset game', async () => {
  const state = {
    game: {
      answer: '4',
      currentTask: [2, 2],
      tasks: [],
      selectedSet: Sets.red,
      selectedDifficulty: Difficulties.beginner,
      elapsedTime: 99,
      roundActive: false,
    } as GameState,
    player: {
      playerName: 'Maya',
      playerClass: '3D',
    } as PlayerState,
  };

  const store: any = configureStore<Partial<RootState>>([thunk])(state);
  await store.dispatch(resetGame());
  expect(store.getActions()).toEqual([
    setTasks(expectedOutput.red.beginner as Multiplication[]),
    {type: SET_CURRENT_TASK, payload: undefined},
    sliceTask(0),
    setTimer(0),
  ]);
});
