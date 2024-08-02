import { put } from 'redux-saga/effects';

import { call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { orderAPI } from '../../../services/api';
import { getCategoryActions } from '../../actions/combineAction';
import toast from '../../../services/toast';

export function* getCategorySaga() {
  try {
    const response: AxiosResponse = yield call(orderAPI.getCategory);
    const resPayload = response?.data;
    yield put(getCategoryActions.returnsSuccess({ ...resPayload }));
  } catch (error) {
    yield put(getCategoryActions.returnsFailure(error));
  }
}

export function* getSubCategorySaga({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      orderAPI.getSubCategory,
      payload
    );
    const resPayload = response?.data;
    yield put(getCategoryActions.getSubCategorySuccess({ ...resPayload }));
    resPayload?.data?.length < 1 &&
      toast.danger({ message: 'No item to display' });
  } catch (error) {
    yield put(getCategoryActions.getSubCategoryFailure(error));
  }
}
