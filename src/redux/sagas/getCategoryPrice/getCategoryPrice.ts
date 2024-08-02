import { put } from 'redux-saga/effects';

import { call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { orderAPI } from '../../../services/api';
import { getCategoryPriceActions } from '../../actions/combineAction';

export function* getCategoryPriceSaga({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      orderAPI.getCategoryPrice,
      payload
    );

    const resPayload = response?.data;
    yield put(getCategoryPriceActions.getCategorySuccess({ ...resPayload }));
  } catch (error) {
    yield put(getCategoryPriceActions.getCategoryFailure(error));
  }
}
