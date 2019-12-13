import { ThunkDispatch } from "redux-thunk";
import { Page, RootState } from "../reducers";
import { SET_CURRENT_PAGE, AppActionTypes, GameActionTypes } from ".";
import { validatePlayerName } from "./gameActions";

export function setCurrentPage(page: Page): AppActionTypes {
  return {
    type: SET_CURRENT_PAGE,
    payload: page
  };
}

export function proceedToGame() {
  return async (
    dispatch: ThunkDispatch<RootState, {}, GameActionTypes | AppActionTypes>,
    getState: () => RootState
  ) => {
    dispatch(validatePlayerName());
    const { playerNameValid } = getState().game;

    if (playerNameValid) {
      dispatch(setCurrentPage(Page.GamePage));
    }
  };
}
