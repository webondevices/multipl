import configureStore from 'redux-mock-store';
import {render} from 'enzyme';
import * as React from 'react';
import GamePage from '../GamePage';
import {RootState, Page} from '../../../reducers';

it('renders correctly', () => {
  const store = configureStore<Partial<RootState>>()({
    app: {
      currentPage: Page.HomePage,
    },
  });

  const props = {
    store,
  };

  const component = <GamePage {...props} />;
  const wrapper = render(component);
  expect(wrapper).toMatchSnapshot();
});
