import { put } from 'redux-saga/effects';

import { call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { orderAPI } from '../../../services/api';
import {
  getCategoryStockActions,
  notificationActions,
  postOrderReturnActions,
  returnActions
} from '../../actions/combineAction';
import { handleError } from '../../../services/toast/toastWithSaga';

export function* postReturnSaga({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(orderAPI.postOrders, payload);
    const resPayload = response?.data;
    yield put(postOrderReturnActions.postReturnSuccess({ ...resPayload }));
    yield put(getCategoryStockActions.getStock());
    yield put(notificationActions.getNotification());
    yield put(returnActions.getReturn()); //re-calling get actions
  } catch (error) {
    yield handleError(error, postOrderReturnActions.postReturnFailure);
  }
}
