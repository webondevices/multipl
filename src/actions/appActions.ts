import { Page } from "../reducers";
import { SET_CURRENT_PAGE, AppActionTypes } from ".";

export function setCurrentPage(page: Page): AppActionTypes {
  return {
    type: SET_CURRENT_PAGE,
    payload: page
  };
}
