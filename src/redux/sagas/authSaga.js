// authSaga.js
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { loginSuccess, loginFailure } from '../actions';
import { AUTH } from '../../config/endpoints';

// The login API request logic
function* loginSaga(action) {
  try {
    const response = yield call(axios.post, AUTH.LOGIN, action.payload);

    if (response.status === 200) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('name', response.data.user.name);

      yield put(loginSuccess({
        token: response.data.token,
        user: response.data.user,
      }));
    } else {
      yield put(loginFailure('Login failed. Please try again.'));
    }
  } catch (error) {
    yield put(loginFailure(error.response?.data?.errors || 'Something went wrong.'));
  }
}

// Watcher saga that listens for login requests
function* watchLoginSaga() {
  yield takeEvery('AUTH/LOGIN_REQUEST', loginSaga);
}

export default watchLoginSaga;
