import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface GetCategoryState {
  loading?: boolean;
  error?: string;
  categories: any;
  subCategories: any;
}
const initialState: GetCategoryState = {
  loading: false,
  error: '',
  categories: null,
  subCategories: null
};

export const getCategorySlice = createSlice({
  name: 'categoryList',
  initialState,
  reducers: {
    getCategory(state) {
      state.loading = true;
    },
    returnsSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.categories = action.payload?.data;
    },
    returnsFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.categories = action?.payload?.message;
    },
    getSubCategory(state) {
      state.loading = true;
    },
    getSubCategorySuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.subCategories = action.payload?.data;
    },
    getSubCategoryFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.subCategories = action?.payload?.message;
    }
  }
});

//Reducer

const getCategoryReducer = getCategorySlice.reducer;
export default getCategoryReducer;
