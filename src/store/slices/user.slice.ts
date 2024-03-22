import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type Initial = {
  token: string | undefined;
};

const initialState: Initial = {
  token: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
