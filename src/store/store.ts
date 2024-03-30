import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import generalSlice from "./slices/general.slice";
import modalSlice from "./slices/modal.slice";
import conversationSlice from "./slices//conversation.slice";
import sessionsSlice from "./slices/sessions.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    user: userSlice,
    general: generalSlice,
    modal: modalSlice,
    conversation: conversationSlice,
    session: sessionsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
