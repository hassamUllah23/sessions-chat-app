import { AxiosResponse } from "axios";
import { GET, PATCH } from "../services/axios.service";
import { User, UpdateProfileParams } from "../utils/types.utils";

type BlockParams = {
  id: string;
  currentId: string;
};

type UnblockParams = {
  id: string;
  currentId: string;
};

const list = async (): Promise<Array<User>> => {
  const url = "users/list";
  const response = await GET<Array<User>>(url);
  return response?.data;
};

const getOne = async ({
  userId,
}: {
  userId: string;
}): Promise<User | undefined> => {
  const url = "users/get";
  const response = await GET<{ userId: string }>(url, { userId: userId });
  return response?.data;
};

const getByUsername = async (params: {
  username: string;
  searcherId: string;
}): Promise<AxiosResponse | null> => {
  const url = "users/get/username";
  return await GET<{ username: string }>(url, { ...params });
};

const addToContacts = async ({
  currentId,
  id,
}: {
  id: string;
  currentId: string;
}): Promise<boolean> => {
  const url = "users/add-contact";
  let resp: boolean = false;
  const response = await PATCH<{ id: string; currentId: string }>(url, {
    id: id,
    currentId: currentId,
  });
  if (response?.status === 200) {
    resp = true;
  }
  return resp;
};

const removeContact = async ({
  currentId,
  id,
}: {
  id: string;
  currentId: string;
}): Promise<boolean> => {
  const url = "users/remove-contact";
  let resp: boolean = false;
  const response = await PATCH<{ id: string; currentId: string }>(url, {
    id: id,
    currentId: currentId,
  });
  if (response?.status === 200) {
    resp = true;
  }
  return resp;
};

const addToBlocklist = async (
  params: BlockParams,
): Promise<AxiosResponse | null> => {
  const url = "users/block";
  return await PATCH<BlockParams>(url, { ...params });
};

const unblock = async (
  params: UnblockParams,
): Promise<AxiosResponse | null> => {
  const url = "users/unblock";
  return await PATCH<UnblockParams>(url, { ...params });
};

type ToggleThemeParams = {
  userId: string;
  theme: "dark" | "light";
};
const toggleTheme = async (
  params: ToggleThemeParams,
): Promise<AxiosResponse | null> => {
  const url = "users/toggle-theme";
  return await PATCH<ToggleThemeParams>(url, { ...params });
};

type ToggleNotifcationsParams = {
  userId: string;
  notifications: boolean;
};
const toggleNotification = async (
  params: ToggleNotifcationsParams,
): Promise<AxiosResponse | null> => {
  const url = "users/toggle-notifications";
  return await PATCH<ToggleNotifcationsParams>(url, { ...params });
};

type UpdateFcmParams = {
  userId: string;
  fcmToken: string;
};

const updateFcmToken = async (
  params: UpdateFcmParams,
): Promise<AxiosResponse | null> => {
  const url = "users/fcm";
  return await PATCH<UpdateFcmParams>(url, { ...params });
};

const udpate = async (
  data: UpdateProfileParams,
): Promise<UpdateProfileParams> => {
  let resp: any = {};
  try {
    const url = "users/update";
    const response = await PATCH<UpdateProfileParams>(url, data);

    if (response?.data?.status !== 200) {
      resp.error = response?.data.message;
      resp.result = false;
    } else {
      resp.result = true;
    }
    return resp;
  } catch (error) {
    console.error(error);
    return resp;
  }
};

const UsersApiClient = {
  udpate,
  list,
  getOne,
  getByUsername,
  addToBlocklist,
  unblock,
  addToContacts,
  removeContact,
  toggleNotification,
  toggleTheme,
  updateFcmToken,
};

export { UsersApiClient };
