import { render } from "enzyme";
import * as React from "react";
import GamePage from "../GamePage";

it("renders correctly", () => {
  const component = <GamePage />;
  const wrapper = render(component);
  expect(wrapper).toMatchSnapshot();
});
