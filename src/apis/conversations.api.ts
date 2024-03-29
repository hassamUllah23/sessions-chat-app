import { AxiosResponse } from "axios";
import { GET, PATCH, POST } from "../services/axios.service";
import { Conversation, Participant } from "../utils/types.utils";

type GetConversationsListParams = {
  userId: string;
  populate?: boolean;
};

type OneToOneConversationParams = {
  currentId: string;
  userId: string;
};

type GroupConversationParams = {
  name: string;
  memberIds: Array<string>;
  adminId: string;
};

type SendMessageParams = {
  conversationId: string;
  senderId: string;
  text?: string;
  attachment?: string;
};

type EditMessageParams = {
  conversationId: string;
  messageId: string;
  senderId: string;
  text: string;
};

type UpdateParticipantsParams = {
  participants: Array<Participant>;
  conversationId: string;
};

type LeaveGroupParams = {
  userId: string;
  conversationId: string;
};

const createOneToOneConversation = async (
  data: OneToOneConversationParams,
): Promise<any | null> => {
  const url = "conversations/create";
  const response = await POST<OneToOneConversationParams>(url, data);
  let resp: boolean = false;
  if (response?.data.status === 200) {
    resp = true;
    return resp;
  }
};

const createGroupConversation = async (
  data: GroupConversationParams,
): Promise<any | null> => {
  const url = "conversations/create/group";
  const response = await POST<GroupConversationParams>(url, data);
  let resp: boolean = false;
  if ((await response?.status) === 200) {
    resp = true;
    return resp;
  }
  return resp;
};

const list = async ({
  userId,
  populate = false,
}: GetConversationsListParams): Promise<Array<Conversation>> => {
  const url = "conversations/list";
  const response = await GET<GetConversationsListParams>(url, {
    userId,
    populate,
  });
  return response?.data;
};

const getOne = async ({
  conversationId,
}: {
  conversationId: string;
}): Promise<Conversation | undefined> => {
  const url = "conversations/get";
  const response = await GET<{ conversationId: string }>(url, {
    conversationId: conversationId,
  });
  return response?.data;
};

const sendMessage = async (
  data: SendMessageParams,
): Promise<AxiosResponse | null> => {
  const url = "conversations/send";
  return await PATCH<SendMessageParams>(url, data);
};

const editMessage = async (
  data: EditMessageParams,
): Promise<AxiosResponse | null> => {
  const url = "conversations/edit";
  return await PATCH<EditMessageParams>(url, data);
};

const updateParticipants = async (
  data: UpdateParticipantsParams,
): Promise<AxiosResponse | null> => {
  const url = "conversations/update-participants";
  return await PATCH<UpdateParticipantsParams>(url, data);
};

const leaveGroup = async (
  data: LeaveGroupParams,
): Promise<AxiosResponse | null> => {
  const url = "conversations/leave";
  return await PATCH<LeaveGroupParams>(url, data);
};

const ConversationsApiClient = {
  list,
  getOne,
  createOneToOneConversation,
  createGroupConversation,
  sendMessage,
  editMessage,
  updateParticipants,
  leaveGroup,
};

export { ConversationsApiClient };
