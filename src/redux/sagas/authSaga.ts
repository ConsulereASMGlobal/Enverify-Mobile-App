import { delay, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, take } from 'redux-saga/effects';
import { authActions } from '../actions/combineAction';
import { LoginPayload } from '../reducers/authSlice';
import { AxiosResponse } from 'axios';
import { authAPI } from '../../services/api';
import { navigate } from '../../navigation/navigationService';
import { handleError } from '../../services/toast/toastWithSaga';
import store from '../store';

export function* handleLogin({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(authAPI.login, payload);

    const resPayload = response?.data;
    //set Token
    yield put(
      authActions.loginSuccess({
        // Dispatch action
        ...resPayload
      })
    );
    navigate('Root');

    // Redirect to Admin page
  } catch (error: any) {
    yield handleError(error, authActions.loginFailed);
    // yield toast.danger({ message: error.toJSON()?.message });
    // yield put(authActions.loginFailed(error?.message)); // Dispatch action
  }
}

export function* handleLogout() {
  yield delay(500);

  // Redirect to Login page
}

export function* authSaga() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    const action: PayloadAction<LoginPayload> = yield take(
      authActions.login.type
    );
    yield fork(handleLogin, action.payload); // Non-blocking
  }

  yield take(authActions.logout.type);
  yield call(handleLogout); // Blocking - wait for the logout function to finish before continuing to watch watchLoginFlow
}
