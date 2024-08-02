import { put } from 'redux-saga/effects';

import { call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { analyticsAPI } from '../../../services/api';
import { analyticsActions } from '../../actions/combineAction';

export function* getAnalyticsSaga() {
  try {
    const response: AxiosResponse = yield call(analyticsAPI.getAnalytics);

    const resPayload = response?.data;
    //set Token
    yield put(
      analyticsActions.analyticsSuccesss({
        ...resPayload
      })
    );

    // Redirect to Admin page
  } catch (error) {
    yield put(analyticsActions.analyticsFailure(error)); // Dispatch action
  }
}
