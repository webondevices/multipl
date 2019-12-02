import configureStore from "redux-mock-store";
import { render, shallow } from "enzyme";
import * as React from "react";
import App from "../App";
import { RootState } from "src/reducers";
import * as actions from "../../../actions";

it("renders correctly", () => {
  const store = configureStore<Partial<RootState>>()({
    todos: {
      todoList: ["item"]
    }
  });

  const props = {
    store,
    color: "red"
  };

  const component = <App {...props} />;
  const wrapper = render(component);
  expect(wrapper).toMatchSnapshot();
});

it("triggers addTodo action when Add button pressed", () => {
  const store = configureStore<Partial<RootState>>()({
    todos: {
      todoList: ["item"]
    }
  });

  const props = {
    store,
    color: "red"
  };

  const component = <App {...props} />;
  const wrapper = shallow(component)
    .dive()
    .dive();

  const addButton = wrapper.find("#addButton");
  const deleteButton = wrapper.find("#deleteButton");

  addButton.simulate("click");
  deleteButton.simulate("click");

  expect(store.getActions()).toEqual([
    actions.addTodo("todo"),
    actions.deleteLastTodo()
  ]);
});
