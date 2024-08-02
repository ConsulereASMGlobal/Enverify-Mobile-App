import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface PostReturnState {
  loading: boolean;
  error: string;
  success: boolean | null;
  successData: any;
}

const initialState: PostReturnState = {
  loading: false,
  error: '',
  success: false,
  successData: {}
};

export const PostReturnSlice = createSlice({
  name: 'postOrderReturn',
  initialState,
  reducers: {
    postReturnOrder(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    postReturnSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.success = true;
      state.successData = action.payload?.data;
    },
    postReturnFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.success = false;
      state.error = action?.payload?.message;
    },
    update(state, action: PayloadAction<any>) {
      state.success = action.payload.success;
    }
  }
});
const postOrdersReturnReducer = PostReturnSlice.reducer;
export default postOrdersReturnReducer;
