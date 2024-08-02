import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface GetProfileState {
  loading?: boolean;
  error?: string;
  profile?: Object;
}

const initialState: GetProfileState = {
  loading: false,
  error: '',
  profile: {}
};

export const getProfileSlice = createSlice({
  name: 'getProfile',
  initialState,
  reducers: {
    getProfile(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    profilesSuccesss(state, action: PayloadAction<any>) {
      state.loading = false;
      state.profile = action?.payload;
    },
    profilesFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action?.payload?.message;
    }
  }
});

// Reducer
const getProfilesReducer = getProfileSlice.reducer;
export default getProfilesReducer;
