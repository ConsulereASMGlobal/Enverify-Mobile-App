import { all, fork, takeLatest } from 'redux-saga/effects';
import {
  analyticsActions,
  authActions,
  getCategoryActions,
  getCategoryPriceActions,
  getCategoryStockActions,
  notificationActions,
  orderActions,
  postOrderActions,
  postOrderReturnActions,
  processesActions,
  productionActions,
  profileActions,
  returnActions
} from '../actions/combineAction';
import { handleLogin } from './authSaga';
import {
  getCategorySaga,
  getSubCategorySaga
} from './getCategory/getCategorySaga';
import { getCategoryPriceSaga } from './getCategoryPrice/getCategoryPrice';
import { getCategoryStockSaga } from './getCategoryStock/getCategoryStock';
import {
  deleteNotificationsListSaga,
  getNotificationsListSaga
} from './notificationSaga/notificationSaga';
import { getOrdersSaga } from './Order/getOrdersSaga';

import { workPostOrdersSaga } from './Order/postOrdersSaga';
import { getProfileSaga } from './Profile/getProfileSaga';
import { getReturnsSaga } from './Return/getReturnsSaga';
import { postReturnSaga } from './Return/postReturnSaga';
import { getProcessesSaga } from './Processes/getProcessesSaga';
import { getProductionsSaga } from './Production/getProducionsSaga';
import { getAnalyticsSaga } from './Analytics/getAnalyticsSaga';

export default function* rootSaga() {
  // yield all([fork(authSaga)]);

  yield all([takeLatest(authActions.login, handleLogin)]);

  yield all([takeLatest(orderActions.getOrder, getOrdersSaga)]);
  yield all([takeLatest(productionActions.getProduction, getProductionsSaga)]);
  // yield all([takeLatest(authActions.login, authSaga)]);
  yield all([takeLatest(returnActions.getReturn, getReturnsSaga)]);
  yield all([takeLatest(postOrderActions.postOrder, workPostOrdersSaga)]);

  yield all([takeLatest(profileActions.getProfile, getProfileSaga)]);

  yield all([
    takeLatest(postOrderReturnActions.postReturnOrder, postReturnSaga)
  ]);
  yield all([takeLatest(getCategoryActions.getCategory, getCategorySaga)]);
  yield all([
    takeLatest(getCategoryActions.getSubCategory, getSubCategorySaga)
  ]);
  yield all([
    takeLatest(getCategoryPriceActions.getCategoryPrice, getCategoryPriceSaga)
  ]);
  yield all([
    takeLatest(getCategoryStockActions.getStock, getCategoryStockSaga)
  ]);

  yield all([
    takeLatest(notificationActions.getNotification, getNotificationsListSaga)
  ]);
  yield all([
    takeLatest(
      notificationActions.deleteNotification,
      deleteNotificationsListSaga
    )
  ]);
  yield all([takeLatest(processesActions.getProcesses, getProcessesSaga)]);
  yield all([takeLatest(analyticsActions.getAnalytics, getAnalyticsSaga)]);
}
