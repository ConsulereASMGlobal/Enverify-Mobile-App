import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface GetAnalyticsState {
  loading?: boolean;
  error?: string;
  analytics?: any;
}

const initialState: GetAnalyticsState = {
  loading: false,
  error: '',
  analytics: null
};

export const getAnalyticsSlice = createSlice({
  name: 'getAnalytics',
  initialState,
  reducers: {
    getAnalytics(state) {
      state.loading = true;
    },
    analyticsSuccesss(state, action: PayloadAction<any>) {
      state.loading = false;
      state.analytics = action?.payload;
    },
    analyticsFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action?.payload?.message;
    }
  }
});

// Reducer
const getAnalyticsReducer = getAnalyticsSlice.reducer;
export default getAnalyticsReducer;
