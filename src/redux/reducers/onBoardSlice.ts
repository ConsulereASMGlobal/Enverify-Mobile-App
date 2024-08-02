import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface onBoardState {
  onBoardStatus?: string;
}

const initialState: onBoardState = {
  onBoardStatus: ''
};

export const onBoardSlice = createSlice({
  name: 'onBoard',
  initialState,
  reducers: {
    onboard(state, action: PayloadAction<any>) {
      state.onBoardStatus = action.payload;
    }
  }
});

// Reducer
const onBoardReducer = onBoardSlice.reducer;
export default onBoardReducer;
