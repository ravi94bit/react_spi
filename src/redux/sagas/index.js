// src/redux/sagas/index.js
import { all } from 'redux-saga/effects';
import watchAuthSaga from './authSaga';  // Import auth saga

export default function* rootSaga() {
  yield all([
    watchAuthSaga(),  // Watch for auth actions
  ]);
}
