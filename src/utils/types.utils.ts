import { InviteStatusEnum, SessionStatusEnum } from "./enums.utils";

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
  user?: User | undefined;
  error?: string | undefined;
};

export type User = {
  _id: string;
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

export type Message = {
  _id?: string;
  text?: string;
  attachment?: string;
  sender: User | string;
  conversation: Conversation | string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Conversation = {
  _id: string;
  name?: string | undefined;
  isGroup?: boolean;
  messages: Array<Message>;
  latestMessage?: Message | string | undefined | null;
  participants: Array<Participant>;
  session: string | Session | null | undefined;
  isSession: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Invite = {
  _id: string;
  status: InviteStatusEnum;
  adminId: string | User;
  inviteeId: string | User;
  conversationId: string | Conversation;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Session = {
  _id: string;
  status: SessionStatusEnum;
  duration: number; // in milliseconds
  conversation: string | Conversation;
  parentConversation: string | Conversation;
  createdAt?: Date;
  updatedAt?: Date;
};
export type Participant = {
  user: string | User;
  role?: "admin" | "member" | string;
};
