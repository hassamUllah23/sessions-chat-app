import { AxiosResponse } from "axios";
import { GET, PATCH, POST } from "../services/axios.service";
import { Session } from "../utils/types.utils";

type CreateSessionParams = {
  adminId: string;
  memberIds: Array<string>;
  duration: number;
  parentConversationId: string;
};
type ListByUserParams = {
  userId: string;
};

type StopSessionParams = {
  adminId: string;
  sessionId: string;
};

const startSession = async (
  data: CreateSessionParams,
): Promise<AxiosResponse | null> => {
  try {
    const url = "sessions/create";
    return await POST<CreateSessionParams>(url, data);
  } catch (error) {
    return null;
  }
};

const list = async ({ userId }: ListByUserParams): Promise<Array<Session>> => {
  const url = "sessions/list";
  const response = await GET<ListByUserParams>(url, {
    userId: userId,
  });
  return response?.data;
};

const stop = async (data: StopSessionParams): Promise<AxiosResponse | null> => {
  const url = "sessions/stop";
  return await PATCH<StopSessionParams>(url, data);
};

const SessionsApiClient = {
  list,
  startSession,
  stop,
};

export { SessionsApiClient };
