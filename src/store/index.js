import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

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
    applyMiddleware(thunk),
    ...enhancers
  )
);

export default store;