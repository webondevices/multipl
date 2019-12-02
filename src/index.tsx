import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore({});

import App from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <App color="Blue" />
  </Provider>,
  document.getElementById("root")
);
