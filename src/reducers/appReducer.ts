import { SET_CURRENT_PAGE, AppActionTypes } from "../actions/types";
import { Page } from "./types";

import { AppState } from ".";

export const initialState: AppState = {
  currentPage: Page.HomePage
};

export function appReducer(state = initialState, action: AppActionTypes) {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    default:
      return state;
  }
}
