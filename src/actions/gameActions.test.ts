import {Multiplication, Sets} from '../reducers';
import {
  setPlayerName,
  incrementTimer,
  setTimer,
  setRoundState,
  setCurrentTask,
  sliceTask,
  setAnswer,
  setSet,
  sliceNextTask,
  SET_PLAYER_NAME,
  INCREMENT_TIMER,
  SET_TIMER,
  SET_ROUND_STATE,
  SET_CURRENT_TASK,
  SLICE_TASK,
  SET_ANSWER,
  SET_TASKS,
} from '.';

test("creates the 'setPlayerName' action", () => {
  const value = 'Mate';
  const action = setPlayerName(value);

  expect(action).toEqual({
    type: SET_PLAYER_NAME,
    payload: value,
  });
});

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

test("creates the 'setSet' action", () => {
  const value = Sets.red;
  const action = setSet(value);

  expect(action).toEqual({
    type: SET_TASKS,
    payload: [],
  });
});

test('slices next random task', async () => {
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

  jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

  await sliceNextTask()(dispatch, getState);

  expect(dispatch).toHaveBeenNthCalledWith(1, setCurrentTask([2, 2]));
  expect(dispatch).toHaveBeenNthCalledWith(2, sliceTask(1));

  (global.Math.random as any).mockRestore();
});
