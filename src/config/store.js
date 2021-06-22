/* eslint-disable quotes */
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../redux/reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const middleware = [thunk];
if (__DEV__) {
  middleware.push(logger);
}

export const Store = createStore(rootReducer, applyMiddleware(...middleware));
