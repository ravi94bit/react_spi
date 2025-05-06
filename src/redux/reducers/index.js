// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Import auth reducer

const rootReducer = combineReducers({
  auth: authReducer,  // Combine authReducer into the root reducer
});

export default rootReducer;
