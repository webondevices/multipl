import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import App from "./components/App/App";
import * as firebase from "./utils/firebase";

firebase.initialise();

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <App color="Blue" />
  </Provider>,
  document.getElementById("root")
);
