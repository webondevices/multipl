import {
  setPlayerName,
  validatePlayerName,
  setPlayerClass,
  validatePlayerClass,
  SET_PLAYER_NAME,
  VALIDATE_PLAYER_NAME,
  SET_PLAYER_CLASS,
  VALIDATE_PLAYER_CLASS,
} from '.';

test("creates the 'setPlayerName' action", () => {
  const value = 'Mate';
  const action = setPlayerName(value);

  expect(action).toEqual({
    type: SET_PLAYER_NAME,
    payload: value,
  });
});

test("creates the 'setPlayerClass' action", () => {
  const value = '3D';
  const action = setPlayerClass(value);

  expect(action).toEqual({
    type: SET_PLAYER_CLASS,
    payload: value,
  });
});

test("creates the 'validatePlayerName' action", () => {
  const action = validatePlayerName();

  expect(action).toEqual({
    type: VALIDATE_PLAYER_NAME,
  });
});

test("creates the 'validatePlayerClass' action", () => {
  const action = validatePlayerClass();

  expect(action).toEqual({
    type: VALIDATE_PLAYER_CLASS,
  });
});
