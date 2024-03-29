import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  getLoggedInUser,
  isLoggedInUser,
  resolveGroupMessageSender,
} from "../../../../utils/functions.utils";
import { AiOutlineSend } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { Conversation, Message, User } from "../../../../utils/types.utils";
import { LongText } from "../../../../components";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { ConversationsApiClient } from "../../../../apis/conversations.api";
import {
  setCurrentConversation,
  setSelectedMessage,
} from "../../../../store/slices/conversation.slice";
import { io, Socket } from "socket.io-client";
import { AxiosResponse } from "axios";
import { setAlert } from "../../../../store/slices/general.slice";
import { MdAttachFile } from "react-icons/md";
import { S3Service } from "../../../../services/s3.service";
import { UNIDENTIFIED } from "../../../../utils/constants.utils";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { set } from "lodash";

type Props = {};

let socket: Socket | null = null;
function CurrentConversation({}: Props) {
  const dispatch = useAppDispatch();
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const [_socketConnected, setSocketConnected] = useState<boolean>(false);
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_ADDRESS);
    socket.on("connceted", () => {
      console.info("connected to server");
      setSocketConnected(true);
    });
    socket.emit("setup", localStorage.getItem("userId") as string);

    socket.emit("join chat", currentConversation!!._id);

    // Clean up function to disconnect socket when component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    socket?.on("message received", (message: Message) => {
      // if the message is from the current conversation, update the conversation
      if (currentConversation?._id === message.conversation) {
        dispatch(
          setCurrentConversation({
            ...currentConversation,
            messages: [...currentConversation.messages, message],
          }),
        ); // updating conversation
      } else {
        //send notification
      }
    });
  });
  return (
    <div className="w-full h-full">
      {currentConversation ? (
        <div className="flex flex-col w-full">
          <div className="flex-1 ">
            <div className="px-5">
              <MessageList messages={currentConversation.messages} />
            </div>
          </div>
          <div className=" flex-1">
            <MessageInput socket={socket} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export { CurrentConversation };

function MessageInput({ socket }: { socket: Socket | null }) {
  const dispatch = useAppDispatch();
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const [newMessage, setNewMessage] = useState<string>("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let attachmentUrl: string | undefined = undefined;
    try {
      if (attachment) {
        const resultStatusCode: number | undefined = await S3Service.upload({
          key: attachment.name,
          file: attachment,
        });
        if (resultStatusCode && resultStatusCode === 200) {
          attachmentUrl = `${import.meta.env.VITE_AWS_BUCKET_URL}/${attachment.name}`;
        }
      }

      const response: AxiosResponse | null =
        await ConversationsApiClient.sendMessage({
          text: newMessage,
          senderId: localStorage.getItem("userId") as string,
          conversationId: currentConversation?._id as string,
          attachment: attachmentUrl,
        });
      if (response?.status === 200) {
        if (currentConversation && currentConversation.messages) {
          const sentMessage = response.data as Message;
          // send the api response to the socket server
          socket?.emit(
            "new message",
            currentConversation.participants.map(
              (participant) => (participant.user as User)._id,
            ),
            sentMessage,
          );
          dispatch(
            setCurrentConversation({
              ...currentConversation,
              messages: [
                ...currentConversation.messages,
                { ...sentMessage },
                // {
                //   conversation: currentConversation._id,
                //   sender: localStorage.getItem("userId") as string,
                //   text: newMessage,
                //   attachment: attachmentUrl,
                // },
              ] as Array<Message>,
            }),
          );
          setNewMessage((_prev) => "");
          setAttachment((_prev) => null);
        }
      } else {
        dispatch(
          setAlert({
            message: "Something went wrong",
            severity: "error",
            open: true,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((_prev) => false);
      setAttachment((_prev) => null);
    }
  };

  const fileInput: any = useRef(null);

  const handleButtonClick = () => {
    // trigger the click event of the file input
    fileInput?.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      setAttachment((_prev) => file);
    }
  };
  return (
    <div className="bg-card w-full p-3">
      <div className="flex flex-col gap-3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-2">
            <input
              type="text"
              name="newMessa"
              id="newMessa"
              className="bg-background p-2.5 border-border text-text sm:text-sm rounded-lg flex-1"
              placeholder="Type here..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              required={attachment ? false : true}
              disabled={loading}
            />
            {attachment ? (
              <div className="flex flex-row items-center justify-center py-1.5 px-2.5 border border-border w-fit rounded-md">
                <p className="text-text text-sm">{attachment.name}</p>
              </div>
            ) : null}

            <div className="">
              <button
                type="button"
                onClick={handleButtonClick}
                className="text-white h-full border border-border bg-background focus:outline-none font-medium rounded-lg text-sm px-3 text-center"
                disabled={loading}
              >
                <MdAttachFile size={22} className="text-text" />
              </button>
              <input
                type="file"
                style={{ display: "none" }} // hide the file input
                ref={fileInput}
                onChange={handleFileChange}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="text-white bg-primary focus:outline-none font-medium rounded-lg text-sm px-3 text-center"
              disabled={loading}
            >
              <AiOutlineSend size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MessageList({ messages }: { messages: Message[] }) {
  const { currentConversation } = useAppSelector((state) => state.conversation);

  useEffect(() => {}, [currentConversation]);
  return (
    <div className={`flex flex-col gap-2 py-2 h-[72vh] overflow-y-auto w-full`}>
      {messages.map((message, index) => (
        <MessageListItem key={index} message={message} />
      ))}
    </div>
  );
}

function MessageListItem({ message }: { message: Message }) {
  const dispatch = useAppDispatch();
  const { currentConversation, selectedMessage } = useAppSelector(
    (state) => state.conversation,
  );

  const [editedText, setEditedText] = useState<string>("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
    dispatch(setSelectedMessage(undefined));
  }, []);
  useEffect(() => {
    scrollToBottom();
    dispatch(setSelectedMessage(undefined));
  }, [currentConversation]);

  const makeEditable = () => {
    console.log("it is called");
    setEditedText(message.text as string);
    dispatch(setSelectedMessage(message));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ConversationsApiClient.editMessage({
      conversationId: currentConversation?._id as string,
      messageId: message._id as string,
      senderId: localStorage.getItem("userId") as string,
      text: editedText,
    })
      .then((response) => {
        if (!response || response.status !== 200) {
          dispatch(
            setAlert({
              message: (response?.data as string) || "Something went wrong",
              open: true,
              severity: "error",
            }),
          );
        } else {
          const selectedIndex = currentConversation?.messages.findIndex(
            (m) => m._id === message._id,
          );
          if (selectedIndex) {
            const newObject: Conversation = set(
              JSON.parse(JSON.stringify(currentConversation)),
              `messages[${selectedIndex}].text`,
              editedText,
            );
            dispatch(setCurrentConversation({ ...newObject }));
            dispatch(setSelectedMessage(undefined));
            dispatch(
              setAlert({
                message: "Message edited succesfully",
                open: true,
                severity: "success",
              }),
            );
          }
        }
      })
      .catch((_error: any) => {
        console.error(_error);
        dispatch(
          setAlert({
            message: "Something went wrong",
            open: true,
            severity: "error",
          }),
        );
      });
  };
  return (
    <div
      ref={messagesEndRef}
      className={`flex flex-row w-full ${isLoggedInUser(message.sender as string) ? "justify-end " : "justify-start"}`}
    >
      <div
        className={`flex flex-col  gap-2 bg-card rounded-lg p-3 w-fit`}
        style={{ maxWidth: "75%" }}
      >
        {currentConversation?.isGroup &&
          !isLoggedInUser(message.sender as string) && (
            <p
              className={`${
                resolveGroupMessageSender(
                  currentConversation,
                  message.sender as string,
                ) === UNIDENTIFIED
                  ? "text-link"
                  : "text-primary"
              } font-semibold text-xs`}
            >
              {resolveGroupMessageSender(
                currentConversation,
                message.sender as string,
              )}
            </p>
          )}
        <div className="flex flex-col gap-5 items-start">
          {selectedMessage === message ? (
            <div>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="edited-text"
                  id="edited-text"
                  className="bg-background border border-border text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:primary"
                  placeholder="Type here..."
                  onChange={(e) => setEditedText(() => e.target.value)}
                  value={editedText}
                  required
                />
              </form>
            </div>
          ) : message.text && message.text?.length > 0 ? (
            <div className="flex flex-row gap-5 items-start group">
              <LongText text={`${message.text}`} className="text-sm" />
              <div
                onClick={makeEditable}
                className={`p-1 bg-card border border-border rounded-full min-w-fit min-h-fit cursor-pointer hover:bg-background hidden ${(message.sender as string) !== getLoggedInUser()._id ? "" : "group-hover:block"}`}
              >
                <MdOutlineModeEditOutline className="text-text" size={10} />
              </div>
            </div>
          ) : null}

          {message.attachment ? (
            <a href={message.attachment} target="_blank">
              <div className="flex flex-row justify-start gap-3 items-center">
                <FaRegFileAlt size={20} className="text-text" />
                <p className="text-sm text-text font-semibold">
                  {
                    message.attachment.split("/")[
                      message.attachment.split("/").length - 1
                    ]
                  }
                </p>
              </div>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
