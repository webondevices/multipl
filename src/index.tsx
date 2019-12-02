import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import App from "./components/App/App";

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <App color="Blue" />
  </Provider>,
  document.getElementById("root")
);
