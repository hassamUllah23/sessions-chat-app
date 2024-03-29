import { UNIDENTIFIED } from "./constants.utils";
import { Conversation, Participant, User } from "./types.utils";

function extractOtherParticipant(
  participants: Array<Participant>,
): Participant | undefined {
  return participants.find(
    (participant) =>
      (participant.user as User)._id !==
      (localStorage.getItem("userId") as string),
  );
}

function resolveConversationTitle(conversation: Conversation): string {
  return (
    conversation.isGroup
      ? conversation.name
      : (
          (extractOtherParticipant(conversation.participants) as Participant)
            .user as User
        ).name
  ) as string;
}

function resolveSingleSender(conversation: Conversation): string {
  return (
    (extractOtherParticipant(conversation.participants) as Participant)
      .user as User
  ).name as string;
}

function resolveGroupMessageSender(
  conversation: Conversation,
  senderId: string,
): string {
  return (
    (
      conversation.participants.find(
        (participant) => (participant.user as User)._id === senderId,
      )?.user as User
    )?.name || UNIDENTIFIED
  );
}

function isLoggedInUser(userId: string): boolean {
  return userId === localStorage.getItem("userId");
}

function isGroupAdmin({
  userId = getLoggedInUser()._id as string,
  conversation,
}: {
  userId?: string;
  conversation: Conversation;
}): boolean {
  const foundAdmin: Participant | undefined = conversation.participants.find(
    (p) =>
      p.role === "admin" &&
      (typeof p.user === "string" ? p.user : (p.user as User)._id) === userId,
  );
  return foundAdmin ? true : false;
}

function getLoggedInUser(): User {
  return JSON.parse(localStorage.getItem("user") as string) as User;
}

function hasEmptyValues(data: Record<string, any>): boolean {
  const checkEmpty = (value: any): boolean => {
    if (typeof value === "object" && value !== null) {
      return hasEmptyValues(value);
    }
    return (
      value === undefined ||
      value === null ||
      value === 0 ||
      value === "" ||
      Number.isNaN(value) ||
      (Array.isArray(value) && value.length === 0)
    );
  };

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      if (checkEmpty(element)) {
        return true;
      }
    }
  }

  return false;
}
export {
  extractOtherParticipant,
  resolveConversationTitle,
  resolveSingleSender,
  resolveGroupMessageSender,
  isLoggedInUser,
  getLoggedInUser,
  hasEmptyValues,
  isGroupAdmin,
};
