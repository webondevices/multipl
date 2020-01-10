import {render} from 'enzyme';
import * as React from 'react';
import ResultPage from '../ResultPage';

it('renders correctly', () => {
  const component = <ResultPage />;
  const wrapper = render(component);
  expect(wrapper).toMatchSnapshot();
});
