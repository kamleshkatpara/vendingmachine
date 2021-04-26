import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import logger from "redux-logger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Ony used during development
const devMode = process.env.NODE_ENV === "development";

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, devMode && logger))
);

export default store;
