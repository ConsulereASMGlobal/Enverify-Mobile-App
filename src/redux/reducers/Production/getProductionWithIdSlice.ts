import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface GetProductionState {
  loading?: boolean;
  error?: string;
  productions?: Array<any>;
}

const initialState: GetProductionState = {
  loading: false,
  error: '',
  productions: []
};

export const getProductionWithIdSlice = createSlice({
  name: 'receiptDetail',
  initialState,
  reducers: {
    getProductionWithId(state) {
      state.loading = true;
    },
    productionsWithIdSuccesss(state, action: PayloadAction<any>) {
      state.loading = false;
      state.productions = action.payload?.data;
    },
    productionsWithIdFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action?.payload?.message;
    }
  }
});

// Reducer
const getProductionsWithIdReducer = getProductionWithIdSlice.reducer;
export default getProductionsWithIdReducer;
