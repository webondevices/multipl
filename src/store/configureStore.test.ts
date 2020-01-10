/**
 * @jest-environment jsdom
 */

import configureStore from './configureStore';
import {Page} from '../reducers';

test('creates the store with initial state', () => {
  const store = configureStore({
    app: {
      currentPage: Page.GamePage,
    },
  });
  const state = store.getState();

  expect(state).toEqual({
    app: {
      currentPage: Page.GamePage,
    },
  });
});
