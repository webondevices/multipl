import {render} from 'enzyme';
import * as React from 'react';
import HomePage from '../HomePage';

it('renders correctly', () => {
  const component = <HomePage />;
  const wrapper = render(component);
  expect(wrapper).toMatchSnapshot();
});
