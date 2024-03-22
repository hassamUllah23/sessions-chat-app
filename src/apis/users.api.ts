import { GET, PATCH, POST } from "../services/axios.service";
import { User, UpdateProfileParams } from "../utils/types.utils";

const list = async (): Promise<Array<User>> => {
  const url = "users/list";
  const response = await GET<Array<User>>(url);
  return response?.data;
};

const getOne = async ({ userId }: { userId: string }): Promise<User> => {
  const url = "users/get";
  const response = await GET<{ userId: string }>(url, { userId: userId });
  return response?.data;
};
//   try {
//     const url = "users/update";
//     const response = await PATCH<UpdateProfileParams>(url, data);

//     if (response?.data?.status !== 200) {
//       resp.error = response?.data.message;
//       resp.result = false;
//     } else {
//       resp.result = true;
//     }
//     return resp;
//   } catch (error) {
//     console.log(error);
//     return resp;
//   }

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
    console.log(error);
    return resp;
  }
};

const UsersApiClient = {
  udpate,
  list,
  getOne,
};

export { UsersApiClient };
