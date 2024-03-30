import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Session } from "../../utils/types.utils";

interface Initial {
  currentSession: Session | undefined | null;
  sessions: Array<Session>;
}

const initialState: Initial = {
  currentSession: null,
  sessions: [],
};
export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setCurrentSession: (
      state,
      action: PayloadAction<Session | undefined | null>,
    ) => {
      state.currentSession = action.payload;
    },
    setSessions: (state, action: PayloadAction<Array<Session>>) => {
      state.sessions = action.payload;
    },
  },
});

export const { setCurrentSession, setSessions } = sessionSlice.actions;

export default sessionSlice.reducer;
