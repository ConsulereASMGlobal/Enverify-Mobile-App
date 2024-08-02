import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface GetProcessesState {
  loading?: boolean;
  error?: string;
  processes?: any;
}

const initialState: GetProcessesState = {
  loading: true,
  error: '',
  processes: null
};

export const getProcessesSlice = createSlice({
  name: 'getProcesses',
  initialState,
  reducers: {
    getProcesses(state) {
      state.loading = true;
    },
    getProcessesSuccesss(state, action: PayloadAction<any>) {
      state.loading = false;
      state.processes = action?.payload;
    },
    getProcessesFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action?.payload?.message;
    }
  }
});

// Reducer
const getProcessesReducer = getProcessesSlice.reducer;
export default getProcessesReducer;
