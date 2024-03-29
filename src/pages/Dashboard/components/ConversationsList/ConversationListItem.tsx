import { setCurrentConversation } from "../../../../store/slices/conversation.slice";
import { useAppDispatch } from "../../../../store/store";
import {
  resolveConversationTitle,
  resolveSingleSender,
} from "../../../../utils/functions.utils";
import { Conversation } from "../../../../utils/types.utils";
import { FaUsers } from "react-icons/fa";
type Props = {
  conversation: Conversation;
};

function ConversationListItem({ conversation }: Props) {
  const dispatch = useAppDispatch();
  const handleSelect = () => {
    dispatch(setCurrentConversation(conversation));
  };
  return (
    <div
      onClick={handleSelect}
      className="hover:brightness-90 pl-3 pr-5 gap-x-5 border border-border flex-nowrap py-2 flex flex-row items-center justify-between w-full bg-background rounded-md cursor-pointer"
    >
      <div className="w-11/12 flex flex-col gap-y-2">
        <p className="text-text font-semibold text-sm">
          {conversation.isGroup
            ? resolveConversationTitle(conversation)
            : resolveSingleSender(conversation)}
        </p>
        <p className="text-xs text-link  truncate">Last message here</p>
      </div>

      {conversation.isGroup ? (
        <div className="min-w-fit">
          {" "}
          <FaUsers className="text-link" size={20} />
        </div>
      ) : null}
    </div>
  );
}

export { ConversationListItem };
