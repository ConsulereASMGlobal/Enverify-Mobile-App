import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface StoreInfoState {
  customerName: string;
  customerMobile: string;
  customerOrg: string;
}
const initialState: StoreInfoState = {
  customerName: '',
  customerMobile: '',
  customerOrg: ''
};

export const storeInfoSlice = createSlice({
  name: 'infoList',
  initialState,
  reducers: {
    setCustomerName(state, action: PayloadAction<any>) {
      state.customerName = action?.payload;
    },
    setCustomerMobile(state, action: PayloadAction<any>) {
      state.customerMobile = action?.payload;
    },
    setCustomerOrg(state, action: PayloadAction<any>) {
      state.customerOrg = action?.payload;
    }
  }
});

//Reducer

const storeInfoReducer = storeInfoSlice.reducer;
export default storeInfoReducer;
