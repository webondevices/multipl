import {ThunkDispatch} from 'redux-thunk';
import {Page, RootState} from '../reducers';
import {SET_CURRENT_PAGE, AppActionTypes, GameActionTypes} from './types';
import {validatePlayerName} from './playerActions';
import * as firebase from '../utils/firebase';

export function setCurrentPage(page: Page): AppActionTypes {
  firebase.logEvent('page_view', {page});
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
}

export function proceedToGame() {
  return async (
    dispatch: ThunkDispatch<RootState, {}, GameActionTypes | AppActionTypes>,
    getState: () => RootState,
  ) => {
    dispatch(validatePlayerName());
    const {playerNameValid} = getState().game;

    if (playerNameValid) {
      dispatch(setCurrentPage(Page.GamePage));
    }
  };
}
