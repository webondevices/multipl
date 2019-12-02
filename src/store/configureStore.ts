import { createStore, applyMiddleware } from "redux";
import { rootReducer, RootState } from "../reducers/";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

const configureStore = (initialState: Partial<RootState>) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(reduxImmutableStateInvariant())
  );
};

export default configureStore;
