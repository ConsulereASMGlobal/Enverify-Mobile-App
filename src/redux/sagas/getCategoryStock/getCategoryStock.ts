import { put } from 'redux-saga/effects';

import { call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { orderAPI } from '../../../services/api';
import { getCategoryStockActions } from '../../actions/combineAction';

export function* getCategoryStockSaga({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      orderAPI.getCategoryStock,
      payload
    );
    const resPayload = response?.data;
    yield put(getCategoryStockActions.getStockSuccess({ ...resPayload }));
  } catch (error) {
    yield put(getCategoryStockActions.getStockFailure(error));
  }
}
