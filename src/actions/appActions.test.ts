import {setCurrentPage, proceedToGame, SET_CURRENT_PAGE} from '.';
import {Page, Sets, Difficulties} from '../reducers';
import {validatePlayerName, validatePlayerClass} from './playerActions';

jest.mock('../utils/firebase');

test("creates the 'setCurrentPage' action", () => {
  const value = Page.ResultPage;
  const action = setCurrentPage(value);

  expect(action).toEqual({
    type: SET_CURRENT_PAGE,
    payload: value,
  });
});

test('progresses to Game page when name and class are valid', async () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  getState.mockReturnValue({
    player: {
      playerNameValid: true,
      playerClassValid: true,
    },
    game: {
      selectedSet: Sets.red,
      selectedDifficulty: Difficulties.beginner,
    },
  });

  await proceedToGame()(dispatch, getState);

  expect(dispatch).toHaveBeenNthCalledWith(1, validatePlayerName());
  expect(dispatch).toHaveBeenNthCalledWith(2, validatePlayerClass());
  expect(dispatch).toHaveBeenNthCalledWith(3, setCurrentPage(Page.GamePage));
});
