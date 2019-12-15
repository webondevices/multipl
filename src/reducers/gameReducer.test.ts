import { appInitialState, appReducer } from "./appReducer";
import { setCurrentPage } from "../actions";
import { Page } from "./types";

it("inits with default state", () => {
  const action = <any>{};
  const nextState = appReducer(undefined, action);

  expect(nextState).toEqual({
    currentPage: Page.HomePage
  });
});

it("handles SET_CURRENT_PAGE action", () => {
  const state = appInitialState;
  const value = Page.ResultPage;
  const action = setCurrentPage(value);

  const nextState = appReducer(state, action);

  expect(nextState).toEqual({
    currentPage: Page.ResultPage
  });
});
