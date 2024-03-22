import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type Initial = {
  openProfileModal: boolean;
  openSettingsModal: boolean;
};

const initialState: Initial = {
  openProfileModal: false,
  openSettingsModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenProfileModal: (state, action: PayloadAction<boolean>) => {
      state.openProfileModal = action.payload;
    },
    setOpenSettingsModal: (state, action: PayloadAction<boolean>) => {
      state.openSettingsModal = action.payload;
    },
  },
});

export const { setOpenProfileModal, setOpenSettingsModal } = modalSlice.actions;

export default modalSlice.reducer;
