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

export const getOrderWithIdSlice = createSlice({
  name: 'receiptDetail',
  initialState,
  reducers: {
    getOrderWithId(state) {
      state.loading = true;
    },
    ordersWithIdSuccesss(state, action: PayloadAction<any>) {
      state.loading = false;
      state.orders = action.payload?.data;
    },
    ordersWithIdFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action?.payload?.message;
    }
  }
});

// Reducer
const getOrdersWithIdReducer = getOrderWithIdSlice.reducer;
export default getOrdersWithIdReducer;
