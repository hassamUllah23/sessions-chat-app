export type AlertState = {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};
export type LoginParams = {
  username: string;
  password: string;
};

export type RegisterParams = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type UpdateProfileParams = {
  userId: string;
  name: string;
  email: string;
  username: string;
};

export type ChangePasswordParams = {
  userId: string;
  oldPassword: string;
  newPassword: string;
};

export type ChangePasswordResponse = {
  result?: boolean | undefined;
  error?: string | undefined;
};

export type ForgotPasswordParams = {
  email: string;
};

export type LoginResponse = {
  token?: string | undefined;
  userId?: string | undefined;
  error?: string | undefined;
};

export type User = {
  _id?: string;
  email: string;
  password: string;
  username: string;
  name: string;
  contacts?: Array<User | string>;
  blockList?: Array<User | string>;
  settings?: {
    theme: "light" | "dark";
    notifications: boolean;
  };
  firebaseToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Conversation = {};
