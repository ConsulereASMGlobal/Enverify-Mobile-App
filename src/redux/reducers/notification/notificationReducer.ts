import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface GetNotificationState {
  loading?: boolean;
  deleting?: boolean;
  error?: string;
  notifications: Array<any>;
}
const initialState: GetNotificationState = {
  loading: false,
  deleting: false,
  error: '',
  notifications: []
};

export const getNotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotification(state) {
      state.loading = true;
    },
    notificationListSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.notifications = action.payload?.data;
    },
    notificationListFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action?.payload?.message;
    },
    deleteNotification(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    deleteNotificationSuccess(state, action: PayloadAction<any>) {
      state.loading = false;

      //    state.notifications = action.payload?.data;
    },
    deleteNotificationFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action?.payload?.message;
    }
  }
});

//Reducer

const notificationReducer = getNotificationSlice.reducer;
export default notificationReducer;
