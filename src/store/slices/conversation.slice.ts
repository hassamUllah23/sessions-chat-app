import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Conversation, Message } from "../../utils/types.utils";

interface Initial {
  currentConversation: Conversation | undefined | null;
  conversations: Array<Conversation>;
  selectedMessage: Message | undefined;
}

const initialState: Initial = {
  currentConversation: null,
  conversations: [],
  selectedMessage: undefined,
};
export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setCurrentConversation: (
      state,
      action: PayloadAction<Conversation | undefined | null>,
    ) => {
      state.currentConversation = action.payload;
    },
    setConversations: (state, action: PayloadAction<Array<Conversation>>) => {
      state.conversations = action.payload;
    },
    setSelectedMessage: (state, action: PayloadAction<Message | undefined>) => {
      state.selectedMessage = action.payload;
    },
  },
});

export const { setCurrentConversation, setConversations, setSelectedMessage } =
  conversationSlice.actions;

export default conversationSlice.reducer;
