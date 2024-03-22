import { GET, PATCH, POST } from "../services/axios.service";
import {
  ChangePasswordParams,
  ChangePasswordResponse,
  LoginParams,
  LoginResponse,
  RegisterParams,
  User,
} from "../utils/types.utils";

const register = async (
  data: RegisterParams,
): Promise<LoginResponse | null> => {
  const url = "auth/register";
  const response = await POST<RegisterParams>(url, data);
  let resp: LoginResponse = {};
  if (response?.data.status === 400) {
    resp.error = response.data.message;
  } else {
    resp.token = response?.data.token;
    resp.userId = response?.data.userId;
  }
  return resp;
};

const login = async (data: LoginParams): Promise<LoginResponse | null> => {
  const url = "auth/login";
  let resp: LoginResponse = {};
  try {
    const response = await GET<LoginParams>(url, data);

    if (response?.data.status === 400) {
      resp.error = response.data.message;
    } else {
      resp.token = response?.data.token;
      resp.userId = response?.data.userId;
      localStorage.setItem("token", response?.data.token);
      localStorage.setItem("userId", response?.data.userId);
    }
  } catch (error) {
    resp.error = "Something went wrong";
  }
  return resp;
};

const changePassword = async (
  data: ChangePasswordParams,
): Promise<ChangePasswordResponse> => {
  let resp: ChangePasswordResponse = {};
  try {
    const url = "auth/change-password";
    const response = await PATCH<ChangePasswordParams>(url, data);

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

const AuthApiClient = {
  login,
  changePassword,
  register,
};

export { AuthApiClient };
