import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface GetStockState {
  loading?: boolean;
  error?: string;
  stockList: Array<any>;
  totalStock?: any;
}

const initialState: GetStockState = {
  loading: false,
  error: "",
  stockList: [],
  totalStock: "",
};

export const getStockSlice = createSlice({
  name: "getStocks",
  initialState,
  reducers: {
    getStock(state) {
      state.loading = true;
    },
    getStockSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.stockList = action?.payload?.data;
      state.totalStock = action?.payload?.totalStock;
    },
    getStockFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action?.payload?.message;
    },
  },
});

//Reducer

const getStocksReducer = getStockSlice.reducer;
export default getStocksReducer;
