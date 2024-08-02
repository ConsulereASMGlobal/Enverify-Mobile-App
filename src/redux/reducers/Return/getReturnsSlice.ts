import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface GetReturnState {
  loading?: boolean;
  error?: string;
  returns?: Array<any>;
}

const initialState: GetReturnState = {
  loading: false,
  error: '',
  returns: []
};

export const getReturnSlice = createSlice({
  name: 'returnList',
  initialState,
  reducers: {
    getReturn(state) {
      state.loading = true;
    },
    returnsSuccesss(state, action: PayloadAction<any>) {
      state.loading = false;
      state.returns = action.payload?.data;
    },
    returnsFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action?.payload?.message;
    }
  }
});

// Reducer
const getReturnsReducer = getReturnSlice.reducer;
export default getReturnsReducer;
