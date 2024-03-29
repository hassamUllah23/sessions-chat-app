import { ConversationsList } from "./components/ConversationsList";
import { CurrentConversation } from "./components/CurrentConversation";
import { Navbar } from "../../components/Navbar";
import { ProfileModal } from "./components/ProfileModal";
import { SettingsModal } from "./components/SettingsModal";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SearchModal } from "./components/SearchModal";
import { GroupSettingsModal } from "./components/GroupSettingsModal";
import { CreateGroupModal } from "./components/CreateGroupModal";
import { useAppSelector } from "../../store/store";
import { EmptyBox } from "./components/Emptybox";
import { Header } from "./components/CurrentConversation/Header";
import { resolveConversationTitle } from "../../utils/functions.utils";

type Props = {};

function Dashboard({}: Props) {
  const location = useLocation();
  const { currentConversation } = useAppSelector((state) => state.conversation);

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <Navbar />
      <SearchModal />
      <ProfileModal />
      <SettingsModal />
      <CreateGroupModal />
      <GroupSettingsModal />
      <div className="flex flex-row w-full h-full">
        {/* Conversations */}
        <div className="w-1/3 border-t border-border h-ful">
          <ConversationsList />
        </div>

        {/* Current Conversation */}
        <div className="w-2/3 border-t border-l h-full border-border">
          <div className="flex flex-col w-full h-full">
            <Header
              title={
                currentConversation
                  ? resolveConversationTitle(currentConversation)
                  : ""
              }
              isGroup={
                currentConversation
                  ? (currentConversation.isGroup as boolean)
                  : false
              }
              hidden={currentConversation ? false : true}
            />
            <div className="flex-1">
              {currentConversation ? <CurrentConversation /> : <EmptyBox />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
