import { put } from "redux-saga/effects";

import { call } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { orderAPI } from "../../../services/api";
import { orderActions } from "../../actions/combineAction";

export function* getOrdersSaga({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(orderAPI.getOrders, payload);

    const resPayload = response?.data;
    //set Token
    yield put(
      orderActions.ordersSuccesss({
        ...resPayload,
      })
    );

    // Redirect to Admin page
  } catch (error) {
    yield put(orderActions.ordersFailure(error)); // Dispatch action
  }
}
