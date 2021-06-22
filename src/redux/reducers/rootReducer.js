/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';

import LocationReducer from './LocationReducer';

const rootReducer = combineReducers({
    locationData: LocationReducer,
});

export default rootReducer;
