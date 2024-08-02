import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface GetOrderState {
  loading?: boolean;
  error?: string;
  orders?: Array<any>;
}

const initialState: GetOrderState = {
  loading: false,
  error: '',
  orders: []
};

export const getOrderSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {
    getOrder(state) {
      state.loading = true;
    },
    ordersSuccesss(state, action: PayloadAction<any>) {
      state.loading = false;
      state.orders = action.payload?.data;
    },
    ordersFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action?.payload?.message;
    }
  }
});

// Reducer
const getOrdersReducer = getOrderSlice.reducer;
export default getOrdersReducer;
