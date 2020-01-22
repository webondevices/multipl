import {setCurrentPage, proceedToGame, SET_CURRENT_PAGE} from '.';
import {Page} from '../reducers';
import {validatePlayerName} from './playerActions';

jest.mock('../utils/firebase');

test("creates the 'setCurrentPage' action", () => {
  const value = Page.ResultPage;
  const action = setCurrentPage(value);

  expect(action).toEqual({
    type: SET_CURRENT_PAGE,
    payload: value,
  });
});

test('progresses to Game page when name is valid', async () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  getState.mockReturnValueOnce({
    game: {
      playerNameValid: true,
    },
  });

  await proceedToGame()(dispatch, getState);

  expect(dispatch).toHaveBeenNthCalledWith(1, validatePlayerName());
  expect(dispatch).toHaveBeenNthCalledWith(2, setCurrentPage(Page.GamePage));
});
