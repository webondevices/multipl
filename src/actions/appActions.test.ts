import { setCurrentPage, SET_CURRENT_PAGE } from ".";
import { Page } from "../reducers";

test("creates the 'setCurrentPage' action", () => {
  const value = Page.ResultPage;
  const action = setCurrentPage(value);

  expect(action).toEqual({
    type: SET_CURRENT_PAGE,
    payload: value
  });
});
