import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { string } from 'yup';

export interface GetCategoryPrice {
  loading?: boolean;
  error?: string;
  categoriesPrice: Array<any>;
}
const initialState: GetCategoryPrice = {
  loading: false,
  error: '',
  categoriesPrice: []
};

export const GetCategorySlice = createSlice({
  name: 'categoryPrice',
  initialState,
  reducers: {
    getCategoryPrice(state) {
      state.loading = true;
    },
    getCategorySuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.categoriesPrice = action.payload?.data;
    },
    getCategoryFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.categoriesPrice = action.payload?.message;
    }
  }
});
//Reducer

const getCategoryPriceReducer = GetCategorySlice.reducer;
export default getCategoryPriceReducer;
