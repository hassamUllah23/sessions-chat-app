import { ConversationsList } from "./components/ConversationsList";
import { CurrentConversation } from "./components/CurrentConversation";
import { Navbar } from "../../components/Navbar";
import { ProfileModal } from "./components/ProfileModal";
import { SettingsModal } from "./components/SettingsModal";

type Props = {};

function Dashboard({}: Props) {
  return (
    <div className="h-full w-full bg-background">
      <Navbar />
      <ProfileModal />
      <SettingsModal />
      <div className="flex flex-row w-full h-full">
        {/* Conversations */}
        <div className="w-1/4 border-t border-border">
          <ConversationsList />
        </div>

        {/* Current Conversation */}
        <div className="w-3/4 border-t border-l border-border">
          <CurrentConversation />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
