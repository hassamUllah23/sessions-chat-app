import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/types.utils";
type Initial = {
  token: string | undefined;
  userId: string | undefined;
  loggedInUser: User | undefined;
};

const initialState: Initial = {
  token: undefined,
  userId: undefined,
  loggedInUser: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<string | undefined>) => {
      state.userId = action.payload;
    },
    setLoggedInUser: (state, action: PayloadAction<User | undefined>) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { setToken, setUserId, setLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
