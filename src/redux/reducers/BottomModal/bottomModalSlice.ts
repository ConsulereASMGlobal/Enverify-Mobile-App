import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface BottomModalState {
  showBottomModal: boolean;
  modalData: array;
  title: string;
  onSelect: Function;
}

const initialState: BottomModalState = {
  showBottomModal: false,
  modalData: [],
  title: '',
  onSelect: () => {}
};

export const getBottomModalSlice = createSlice({
  name: 'bottomModal',
  initialState,
  reducers: {
    toggleBottomModal(state, action) {
      state.showBottomModal = action.payload.showList;
      state.modalData = action.payload.data;
      state.title = action.payload.title;
      state.onSelect = action.payload.onSelect;
    }
  }
});

// Reducer
const getBottomModalReducer = getBottomModalSlice.reducer;
export default getBottomModalReducer;
