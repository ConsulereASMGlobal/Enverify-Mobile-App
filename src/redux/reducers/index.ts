import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import getOrdersReducer from "./Order/getOrdersSlice";
import getReturnsReducer from "./Return/getReturnsSlice";
import postOrdersReducer from "./Order/postOrdersSlice";
import getProfilesReducer from "./Profile/getProfileSlice";
import postOrdersReturnReducer from "./Return/orderReturnsSlice";
import getCategoryReducer from "./getCategoryReducer/getCategoryReducer";
import getCategoryPriceReducer from "./getCaterogyPriceReducer/getCategoryPriceReducer";
import getStocksReducer from "./getStockReducer/GetStockReducer";
import notificationReducer from "./notification/notificationReducer";
import storeInfoReducer from "./storeInfo/storeInfoSlice";
import getOrdersWithIdReducer from "./Order/getOrdersWithIdSlice";
import getBottomModalReducer from "./BottomModal/bottomModalSlice";
import getProcessesReducer from "./getProcesses/getProcessesSlice";
import getProductionsReducer from "./Production/getProductionsSlice";
import getAnalyticsReducer from "./Analytics/getAnalytics";
import onBoardReducer from "./onBoardSlice";
import franchiseeReducer from "./FranchiseeId/franchisee";

export const rootReducer = combineReducers({
  auth: authReducer,
  orderList: getOrdersReducer,
  productionList: getProductionsReducer,
  orderWithId: getOrdersWithIdReducer,
  returnList: getReturnsReducer,
  postOrder: postOrdersReducer,
  getProfile: getProfilesReducer,
  getAnalytics: getAnalyticsReducer,
  postOrderReturn: postOrdersReturnReducer,
  categoryList: getCategoryReducer,
  categoryPrice: getCategoryPriceReducer,
  getStocks: getStocksReducer,
  notification: notificationReducer,
  infoList: storeInfoReducer,
  bottomModal: getBottomModalReducer,
  getProcesses: getProcessesReducer,
  onBoard: onBoardReducer,
  franchisee: franchiseeReducer,
});
