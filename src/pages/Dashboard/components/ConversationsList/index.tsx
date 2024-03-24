import { Conversation } from "../../../../utils/types.utils";
import { ConversationListItem } from "./ConversationListItem";

type Props = {};

function ConversationsList({}: Props) {
  const convos: Array<Conversation> = [];
  return (
    <div className="w-full h-full">
      <div className="flex flex-row w-full">
        {convos.map((_convo) => {
          return <ConversationListItem conversation={{}} />;
        })}
      </div>
    </div>
  );
}

export { ConversationsList };
