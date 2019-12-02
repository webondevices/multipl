/**
 * @jest-environment jsdom
 */

import { render } from "react-dom";
import { shallow } from "enzyme";
import App from "./components/App/App";
import "./index";

jest.mock("react-dom");

test("renders App", () => {
  const root = document.createElement("div");
  root.setAttribute("id", "root");
  document.body.appendChild(root);

  const [component] = (render as jest.Mock).mock.calls[0];

  const hasCheckout = shallow(component)
    .find(App)
    .exists();

  expect(hasCheckout).toBe(true);
});
