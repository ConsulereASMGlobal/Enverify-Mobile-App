import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  loading?: boolean;
  error?: string;
  orders?: Array<any>;
}

const initialState: AuthState = {
  loading: false,
  error: '',
  orders: []
};

export const postOrderSlice = createSlice({
  name: 'postOrder',
  initialState,
  reducers: {
    postOrder(state, action) {
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
const postOrdersReducer = postOrderSlice.reducer;
export default postOrdersReducer;
