import { useMemo } from "react";
import {
  applyMiddleware,
  combineReducers,
  createStore as reduxCreateStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { reducer as formReducer } from "redux-form";

import rootSaga from "../sagas";
import users from "./users";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const rootReducer = combineReducers({
  users,
  form: formReducer,
});

/**
 * This is based on
 * https://github.com/vercel/next.js/blob/canary/examples/with-redux/store.js
 */

let store;

const createStore = (state) => {
  const newStore = reduxCreateStore(
    rootReducer,
    state,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(rootSaga);
  return newStore;
};

export const initializeStore = (state) => {
  let currentStore = store ? store : createStore(state);
  if (state && store) {
    currentStore = createStore({
      ...store.getState(),
      ...state,
    });
    store = undefined;
  }
  if (typeof window === "undefined") return currentStore;
  if (!store) store = currentStore;
  return currentStore;
};

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};
