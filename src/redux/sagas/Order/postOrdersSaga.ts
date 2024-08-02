import { put } from 'redux-saga/effects';

import { call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { orderAPI } from '../../../services/api';
import { orderActions, postOrderActions } from '../../actions/combineAction';
import { handleError } from '../../../services/toast/toastWithSaga';

export function* workPostOrdersSaga({ payload }) {
  try {
    const response: AxiosResponse = yield call(orderAPI.postOrders, payload);

    const resPayload = response?.data;
    //set Token
    yield put(
      postOrderActions.ordersSuccesss({
        ...resPayload
      })
    );

    yield put(orderActions.getOrder()); //getting new order

    // Redirect to Admin page
  } catch (error) {
    yield handleError(error, postOrderActions.ordersFailure);
    // yield put(postOrderActions.ordersFailure(error)); // Dispatch action
  }
}
