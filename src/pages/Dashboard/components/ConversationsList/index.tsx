import { useEffect } from "react";
import { ConversationListItem } from "./ConversationListItem";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { ConversationsApiClient } from "../../../../apis/conversations.api";
import { setConversations } from "../../../../store/slices/conversation.slice";

type Props = {};

function ConversationsList({}: Props) {
  const dispatch = useAppDispatch();
  const { conversations } = useAppSelector((state) => state.conversation);
  useEffect(() => {
    ConversationsApiClient.list({
      userId: localStorage.getItem("userId") as string,
    }).then((data) => {
      dispatch(setConversations(data));
    });
  }, []);
  return (
    <div className="w-full h-full">
      <div className="flex flex-row justify-between items-center w-full px-4 py-3 border-b border-border">
        <p className="text-text font-semibold text-lg bg-transparent m-0 p-0">
          Conversations
        </p>
        <ul>
          <li
            data-hs-overlay="#create-group-modal"
            className="text-text mt-1 text-sm text-nowrap cursor-pointer rounded-md hover:bg-background"
          >
            Create Group
          </li>
        </ul>
      </div>
      <div className="flex flex-col w-full gap-y-2 p-2 overflow-y-auto flex-1">
        {conversations.map((conversation, index) => {
          return (
            <ConversationListItem key={index} conversation={conversation} />
          );
        })}
      </div>
    </div>
  );
}

export { ConversationsList };
