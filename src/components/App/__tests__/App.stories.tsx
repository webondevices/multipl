import configureStore from "redux-mock-store";
import { RootState, Page } from "src/reducers";
import * as React from "react";
import App from "../App";

export default { title: "App" };

const store = configureStore<Partial<RootState>>()({
  app: {
    currentPage: Page.HomePage
  }
});

export const component = () => <App store={store} />;
