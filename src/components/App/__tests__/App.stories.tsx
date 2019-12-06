import configureStore from "redux-mock-store";
import { RootState } from "src/reducers";
import * as React from "react";
import App from "../App";

export default { title: "App" };

const store = configureStore<Partial<RootState>>()({
  todos: {
    todoList: ["item"]
  }
});

export const component = () => <App store={store} />;
