import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import {rootReducer, RootState} from '../reducers';

const getCompose = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const configureStore = (initialState: Partial<RootState>) => {
  const composeEnhancers = getCompose();
  const enhancer = composeEnhancers(
    applyMiddleware(thunk, reduxImmutableStateInvariant()),
  );

  return createStore(rootReducer, initialState, enhancer);
};

export default configureStore;
