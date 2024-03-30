import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AlertState } from "../../utils/types.utils";

interface Initial {
  alert: AlertState;
  tab: "conversation" | "session";
}

const initialState: Initial = {
  alert: {
    open: false,
    message: "",
    severity: "error",
  },
  tab: "conversation",
};
export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertState>) => {
      state.alert = action.payload;
    },
    setTab: (state, action: PayloadAction<"conversation" | "session">) => {
      state.tab = action.payload;
    },
  },
});

export const { setAlert, setTab } = generalSlice.actions;

export default generalSlice.reducer;
