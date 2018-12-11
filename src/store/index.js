import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger';

const devMiddleware = process.env.NODE_ENV === 'development'
  ? [createLogger()]
  : [];


const enhancers = [];
let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
  const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  if (typeof composeWithDevToolsExtension === 'function')
    composeEnhancers = composeWithDevToolsExtension;
}

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...devMiddleware),
    ...enhancers
  )
);

export default store;