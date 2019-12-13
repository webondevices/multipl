import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer, RootState } from "../reducers/";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

const getCompose = () =>
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const configureStore = (initialState: Partial<RootState>) => {
  const composeEnhancers = getCompose();
  const enhancer = composeEnhancers(
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );

  return createStore(rootReducer, initialState, enhancer);
};

export default configureStore;
