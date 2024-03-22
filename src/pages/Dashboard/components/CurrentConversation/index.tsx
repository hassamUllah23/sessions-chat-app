import { Conversation } from "../../../../utils/types.utils";

type Props = {};

function CurrentConversation({}: Props) {
  const currentConversation: Conversation | undefined = undefined;
  return (
    <div className="w-full h-full">
      {currentConversation ? (
        <div>Conversation displayed here</div>
      ) : (
        <div className="flex flex-row w-full h-full items-center justify-center text-link text-4xl">
          Select a conversation
        </div>
      )}
    </div>
  );
}

export { CurrentConversation };
