import { AxiosResponse } from "axios";
import { GET, PATCH, POST } from "../services/axios.service";
import { Invite } from "../utils/types.utils";

export type AcceptParams = {
  inviteId: string;
  inviteeId: string;
};
export type RejectParams = {
  inviteId: string;
  inviteeId: string;
};

type CreateInviteParams = {
  adminId: string;
  inviteeId: string;
  conversationId: string;
};

type ListByConversationParams = {
  conversationId: string;
};
type ListByUserParams = {
  userId: string;
};

const createInvite = async (
  data: CreateInviteParams,
): Promise<AxiosResponse | null> => {
  try {
    const url = "invites/create";
    return await POST<CreateInviteParams>(url, data);
  } catch (error) {
    return null;
  }
};

const listByConversation = async ({
  conversationId,
}: ListByConversationParams): Promise<Array<Invite>> => {
  const url = "invites/list/conversation";
  const response = await GET<ListByConversationParams>(url, {
    conversationId: conversationId,
  });
  return response?.data;
};
const listPendingUserInvites = async ({
  userId,
}: ListByUserParams): Promise<Array<Invite>> => {
  const url = "invites/list/user";
  const response = await GET<ListByUserParams>(url, {
    userId: userId,
  });
  return response?.data;
};

const accept = async (data: AcceptParams): Promise<AxiosResponse | null> => {
  const url = "invites/accept";
  return await PATCH<AcceptParams>(url, data);
};
const reject = async (data: RejectParams): Promise<AxiosResponse | null> => {
  const url = "invites/reject";
  return await PATCH<RejectParams>(url, data);
};

const InvitesApiClient = {
  listByConversation,
  listPendingUserInvites,
  createInvite,
  accept,
  reject,
};

export { InvitesApiClient };
