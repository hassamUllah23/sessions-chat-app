import { useEffect } from "react";
import { ConversationListItem } from "./ConversationListItem";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { ConversationsApiClient } from "../../../../apis/conversations.api";
import {
  setConversations,
  setCurrentConversation,
} from "../../../../store/slices/conversation.slice";
import { SessionListItem } from "./SessionListItem";
import { SessionsApiClient } from "../../../../apis/sessions.api";
import { setSessions } from "../../../../store/slices/sessions.slice";
import { setTab } from "../../../../store/slices/general.slice";

type Props = {};

function ConversationsList({}: Props) {
  const dispatch = useAppDispatch();
  const { conversations } = useAppSelector((state) => state.conversation);
  const { sessions } = useAppSelector((state) => state.session);
  const { tab } = useAppSelector((state) => state.general);

  useEffect(() => {
    ConversationsApiClient.list({
      userId: localStorage.getItem("userId") as string,
    }).then((data) => {
      dispatch(setConversations(data));
    });

    SessionsApiClient.list({
      userId: localStorage.getItem("userId") as string,
    }).then((data) => {
      dispatch(setSessions(data));
    });
  }, [tab]);
  return (
    <div className="w-full h-full">
      <nav
        className="flex flex-row w-full border-b border-border py-1 px-1"
        aria-label="Tabs"
        role="tablist"
      >
        <button
          type="button"
          className={`active py-2.5 text-text w-1/2 font-normal ${tab === "conversation" ? "bg-card !font-semibold rounded-lg border-2 border-border" : "bg-transparent"}`}
          id="unstyled-tabs-item-1"
          data-hs-tab="#unstyled-tabs-1"
          aria-controls="unstyled-tabs-1"
          role="tab"
          onClick={() => {
            dispatch(setCurrentConversation(undefined));
            dispatch(setTab("conversation"));
          }}
        >
          Conversations{" "}
        </button>
        <button
          type="button"
          className={`py-2.5 text-text w-1/2 font-normal ${tab === "session" ? "bg-card !font-semibold rounded-lg border-2 border-border" : "bg-transparent"}`}
          id="unstyled-tabs-item-2"
          data-hs-tab="#unstyled-tabs-2"
          aria-controls="unstyled-tabs-2"
          role="tab"
          onClick={() => {
            dispatch(setCurrentConversation(undefined));
            dispatch(setTab("session"));
          }}
        >
          Sessions
        </button>
      </nav>

      <div className="mt-1">
        <div
          id="unstyled-tabs-1"
          role="tabpanel"
          aria-labelledby="unstyled-tabs-item-1"
        >
          <div className="w-full h-full">
            <div className="flex flex-row justify-between items-center w-full px-4 py-1 border-b border-border">
              <p className="text-text font-semibold text-lg bg-transparent m-0 p-0">
                Conversations
              </p>
              <ul>
                <li
                  data-hs-overlay="#create-group-modal"
                  className="text-text text-sm text-nowrap cursor-pointer rounded-md bg-link/10 p-2"
                >
                  Create Group
                </li>
              </ul>
            </div>
            <div className="flex flex-col w-full gap-2 p-2 overflow-y-auto flex-1">
              {conversations.map((conversation, index) => {
                return (
                  <ConversationListItem
                    key={index}
                    conversation={conversation}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div
          id="unstyled-tabs-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="unstyled-tabs-item-2"
        >
          <div className="w-full h-full">
            {/* <p className="text-text font-semibold text-lg bg-transparent m-0 p-0">
              Sessions
            </p> */}
            <div className="flex flex-col w-full p-2 overflow-y-auto flex-1">
              {sessions.map((session, index) => {
                return <SessionListItem key={index} session={session} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ConversationsList };
