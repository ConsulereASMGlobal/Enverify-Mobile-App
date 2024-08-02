import { put } from 'redux-saga/effects';

import { call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { notificationAPI } from '../../../services/api';
import { notificationActions } from '../../actions/combineAction';
import store from '../../../redux/store';

export function* getNotificationsListSaga() {
  const userId = store.getState()?.auth?.currentUser?.userId;
  try {
    const response: AxiosResponse = yield call(
      notificationAPI.getNotifications,
      { userId }
    );
    const resPayload = response?.data;
    yield put(notificationActions.notificationListSuccess({ ...resPayload }));
  } catch (error) {
    yield put(notificationActions.notificationListFailure(error));
  }
}

export function* deleteNotificationsListSaga({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      notificationAPI.deleteNotificaion,
      payload
    );
    const resPayload = response?.data;

    yield put(notificationActions.deleteNotificationSuccess({ ...resPayload }));
  } catch (error) {
    yield put(notificationActions.deleteNotificationFailure(error));
  } finally {
    yield put(notificationActions.getNotification());
  }
}
