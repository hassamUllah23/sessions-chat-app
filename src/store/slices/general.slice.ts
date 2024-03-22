import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AlertState } from "../../utils/types.utils";

interface Initial {
  alert: AlertState;
}

const initialState: Initial = {
  alert: {
    open: false,
    message: "",
    severity: "error",
  },
};
export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertState>) => {
      state.alert = action.payload;
    },
  },
});

export const { setAlert } = generalSlice.actions;

export default generalSlice.reducer;
