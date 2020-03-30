import {ThunkDispatch} from 'redux-thunk';
import {Page, RootState} from '../reducers';
import {SET_CURRENT_PAGE, AppActionTypes, PlayerActionTypes} from './types';
import {validatePlayerName, validatePlayerClass} from './playerActions';
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
    dispatch: ThunkDispatch<RootState, {}, PlayerActionTypes | AppActionTypes>,
    getState: () => RootState,
  ) => {
    dispatch(validatePlayerName());
    dispatch(validatePlayerClass());
    const {selectedSet, selectedDifficulty} = getState().game;
    const {playerNameValid, playerClassValid} = getState().player;

    if (
      playerNameValid &&
      playerClassValid &&
      selectedDifficulty !== null &&
      selectedSet !== null
    ) {
      dispatch(setCurrentPage(Page.GamePage));
    }
  };
}
