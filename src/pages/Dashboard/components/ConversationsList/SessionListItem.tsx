import { setCurrentConversation } from "../../../../store/slices/conversation.slice";
import { setCurrentSession } from "../../../../store/slices/sessions.slice";
import { useAppDispatch } from "../../../../store/store";
import { Conversation, Session } from "../../../../utils/types.utils";
import { MdOutlineTimer } from "react-icons/md";
type Props = {
  session: Session;
};

function SessionListItem({ session }: Props) {
  console.log({ session });
  const dispatch = useAppDispatch();
  const handleSelect = () => {
    dispatch(setCurrentSession(session));
    console.log({ currentConversation: session.conversation });
    dispatch(setCurrentConversation(session.conversation as Conversation));
  };
  return (
    <div
      onClick={handleSelect}
      className="hover:brightness-90 pl-3 pr-5 gap-x-5 border border-border flex-nowrap py-2 flex flex-row items-center justify-between w-full bg-background rounded-md cursor-pointer"
    >
      <div className="w-11/12 flex flex-col gap-y-2 py-2">
        <p className="text-text font-semibold text-sm">
          {(session.parentConversation as Conversation).name}
        </p>
      </div>

      {(session.conversation as Conversation).isGroup ? (
        <div className="min-w-fit">
          {" "}
          <MdOutlineTimer className="text-link" size={20} />
        </div>
      ) : null}
    </div>
  );
}

export { SessionListItem };
