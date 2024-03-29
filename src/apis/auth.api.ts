import { GET, PATCH, POST } from "../services/axios.service";
import {
  ChangePasswordParams,
  ForgotPasswordParams,
  LoginParams,
  LoginResponse,
  RegisterParams,
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
      resp.user = response?.data.user;
      localStorage.setItem("token", response?.data.token);
      localStorage.setItem("userId", response?.data.userId);
      localStorage.setItem("user", JSON.stringify(response?.data.user));
    }
  } catch (error) {
    resp.error = "Something went wrong";
  }
  return resp;
};

const changePassword = async (data: ChangePasswordParams): Promise<boolean> => {
  let resp: boolean = false;
  try {
    const url = "auth/change-password";
    const response = await PATCH<ChangePasswordParams>(url, data);

    if (response?.data?.status !== 200) {
      resp = true;
    }
    return resp;
  } catch (error) {
    console.error(error);
    return resp;
  }
};

const forgotPassword = async (data: ForgotPasswordParams): Promise<boolean> => {
  let resp: boolean = false;
  try {
    const url = "auth/forgot-password";
    const response = await PATCH<ForgotPasswordParams>(url, data);

    if (response?.data?.status !== 200) {
      resp = true;
    }
    return resp;
  } catch (error) {
    console.error(error);
    return resp;
  }
};

const AuthApiClient = {
  login,
  changePassword,
  register,
  forgotPassword,
};

export { AuthApiClient };
