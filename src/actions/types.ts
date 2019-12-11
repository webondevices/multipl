import { Page } from "../reducers/types";

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

interface SetCurrentPageAction {
  type: typeof SET_CURRENT_PAGE;
  payload: Page;
}

export type AppActionTypes = SetCurrentPageAction;
