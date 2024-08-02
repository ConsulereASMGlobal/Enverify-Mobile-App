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

export const getProductionSlice = createSlice({
  name: 'productionList',
  initialState,
  reducers: {
    getProduction(state) {
      state.loading = true;
    },
    productionsSuccesss(state, action: PayloadAction<any>) {
      state.loading = false;
      state.productions = action.payload?.data;
    },
    productionsFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action?.payload?.message;
    }
  }
});

// Reducer
const getProductionsReducer = getProductionSlice.reducer;
export default getProductionsReducer;
