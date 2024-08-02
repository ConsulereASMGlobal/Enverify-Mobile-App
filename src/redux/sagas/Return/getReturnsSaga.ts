import { put } from 'redux-saga/effects';

import { call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { orderAPI } from '../../../services/api';
import { returnActions } from '../../actions/combineAction';

export function* getReturnsSaga({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(orderAPI.getReturn, payload);

    const resPayload = response?.data;
    //set Token
    yield put(
      returnActions.returnsSuccesss({
        ...resPayload
      })
    );

    // Redirect to Admin page
  } catch (error) {
    yield put(returnActions.returnsFailure(error)); // Dispatch action
  }
}
