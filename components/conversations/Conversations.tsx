"use client";
import Image from "next/image";
import Link from "next/link";
import {
  CameraIcon,
  FaceSmileIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  PlusCircleIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { MicrophoneIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";

interface Message {
  conversationId: string;
  senderId: string;
  text: string;
  createdAt?: Date;
}

const Conversations = ({
  bookings,
  id,
  token,
}: {
  bookings: [];
  id: string;
  token: string;
}) => {
  const [conversation, setConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  //   let socket: Socket = io("ws://0.0.0.0.:3001");
  let socket: Socket = io("https://blesstours.onrender.com");

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("receive_msg", (data: any) => {
      console.log("socket data", data);
      setMessages((prev) => [
        ...(prev! || []),
        {
          conversationId: data.roomId!,
          senderId: data.senderId,
          text: data.text,
          createdAt: data.createdAt,
        },
      ]);
    });
  }, [socket]);


  const handleConvsersation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    convo: string
  ) => {
    e.preventDefault();
    setConversation(convo);
    socket.emit("join_room", convo);
  };

  useEffect(() => {
    const getConversation = async () => {
      try {
        if (conversation) {
          const response = await fetch(
            `https://blesstours.onrender.com/api/v1/messages/${conversation}`,
            {
              headers: {
                "x-user-token": token,
              },
            }
          );
          const data = await response.json();
          console.log("conversation data", data);
          setMessages(data.data);
        }
      } catch (error) {
        // Handle error, e.g., show an error message
        console.error("Error fetching conversation:", error);
      }
    };

    getConversation();
  }, [conversation]);

  const handleAddMessage = async (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      const response = await fetch(
        `https://blesstours.onrender.com/api/v1/messages/`,

        {
          method: "POST",
          body: JSON.stringify({
            conversationId: conversation!,
            senderId: id,
            text: newMessage,
          }),
          headers: {
            "Content-Type": "application/json",
            "x-user-token": token,
          },
        }
      );

      const res = await response.json();
      console.log("response", res);
      if (res.statusCode == 201) {
        socket.emit("send_msg", {
          roomId: conversation!,
          senderId: id,
          text: newMessage,
          createdAt: new Date(), // Changed from `new Date.now()` to `new Date()`
        });
      } else {
        throw new Error("An error occured");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setNewMessage("");
    }
  };

  console.log("conversation", conversation);
  console.log("messages", messages);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <>
      <div className="chat-box__nav p-4 col-span-12 min-[1024px]:col-span-6 xl:col-span-4">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-15 h-15 rounded-full overflow-hidden shrink-0">
            <Image
              width={60}
              height={60}
              src="/img/user-1.jpg"
              alt="image"
              className="w-full h-full object-fit-cover"
            />
          </div>
          <div className="flex gap-3 items-center justify-content-end flex-wrap">
            <Link
              href="#"
              className="link inline-block shrink-0 text-[var(--neutral-700)] hover:text-primary"
            >
              <i className="las la-edit text-3xl"></i>
            </Link>
            <Link
              href="#"
              className="link inline-block shrink-0 text-[var(--neutral-700)] hover:text-primary"
            >
              <i className="las la-ellipsis-v text-3xl"></i>
            </Link>
          </div>
        </div>
        <div className="flex items-center p-2 border border-neutral-30 bg-[var(--bg-2)] rounded-full my-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full focus:outline-none lg:pl-2 bg-transparent border-0"
          />
          <button
            type="button"
            className="grid place-content-center  w-10 h-10 rounded-full border-0 bg-primary text-white shrink-0"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
        <div
          className="max-h-[600px] overflow-y-auto scrollbar-hide"
          style={{ overflowY: "auto" }}
        >
          <ul className="flex flex-col gap-6">
            {bookings.map(
              ({ NAME, _id }: { NAME: string; _id: string }, index: number) => {
                return (
                  <li key={index}>
                    <button
                      onClick={(e) => handleConvsersation(e, _id)}
                      className="flex flex-wrap items-center gap-4"
                    >
                      <div className="w-11 h-11 relative z-[1] rounded-full shrink-0">
                        <Image
                          width={44}
                          height={44}
                          src="/img/user-1.jpg"
                          alt="image"
                          className="w-full h-full object-fit-cover overflow-hidden rounded-full"
                        />
                        <span className="inline-block w-3 h-3 rounded-full bg-[#37D27A] absolute end-0 bottom-0 z-[1]"></span>
                      </div>
                      <div className="flex-grow flex items-center justify-between gap-4">
                        <div className="flex-grow">
                          <p className="font-semibold mb-1"> {NAME} </p>
                          <span className="block text-xs clr-neutral-500">
                            just ideas for next time
                          </span>
                        </div>
                        <div className="shrink-0 inline-block text-center">
                          <div className="grid place-content-center w-6 h-6 rounded-full bg-primary text-white">
                            <span className="text-sm lh-1">1</span>
                          </div>
                          <span className="inline-block text-primary text-xs">
                            4m
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
      {conversation ? (
        <div className="col-span-12 min-[1024px]:col-span-6 xl:col-span-8 flex flex-col justify-between">
          <div className="chat-box__content-head p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-15 h-15 relative z-[1] rounded-full shrink-0">
                  <Image
                    width={60}
                    height={60}
                    src="/img/user-5.jpg"
                    alt="image"
                    className="w-full h-full object-fit-cover overflow-hidden rounded-full"
                  />
                  <span className="inline-block w-4 h-4 rounded-full bg-[#37D27A] absolute end-0 bottom-0 z-[1]"></span>
                </div>
                <h5 className="mb-0 flex-grow clr-neutral-500">Peter Parker</h5>
              </div>
              <div className="flex gap-3 items-center justify-content-end flex-wrap">
                <Link
                  href="#"
                  className="link inline-block shrink-0 text-[var(--neutral-700)] hover:text-primary"
                >
                  <PhoneIcon className="w-6 h-6" />
                </Link>
                <Link
                  href="#"
                  className="link inline-block shrink-0 text-[var(--neutral-700)] hover:text-primary"
                >
                  <VideoCameraIcon className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
          <div
            className="max-h-[600px] min-h-full scrollbar-hide bg-[#EAEBFD] p-4 overflow-y-auto"
            style={{ overflowY: "auto" }}
            ref={scrollRef}
          >
            <ul className="flex flex-col gap-6">
              {messages?.map((message) => {
                return message.senderId == id ? (
                  <li>
                    <div className="flex flex-col items-end">
                      <div className="bg-white rounded-lg py-3 px-5 md:max-w-[45%]  relative after:absolute after:bottom-[-12px] after:right-4 after:border-l-[12px] after:border-l-transparent after:border-r-[12px] after:border-r-transparent after:border-t-[12px] after:border-t-white">
                        <p className="inline-block mb-0 clr-neutral-500">
                          {message.text}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full overflow-hidden mt-4">
                        <Image
                          width={48}
                          height={48}
                          src="/img/user-2.jpg"
                          alt="image"
                          className="w-full h-full object-fit-cover"
                        />
                      </div>
                    </div>
                  </li>
                ) : (
                  <li>
                    <div className="flex flex-col items-start">
                      <div className="w-12 h-12 rounded-full overflow-hidden mb-4">
                        <Image
                          width={48}
                          height={48}
                          src="/img/user-5.jpg"
                          alt="image"
                          className="w-full h-full object-fit-cover"
                        />
                      </div>
                      <div className="bg-white rounded-lg py-3 px-5 md:max-w-[45%] relative after:absolute after:top-[-12px] after:left-4 after:border-l-[12px] after:border-l-transparent after:border-r-[12px] after:border-r-transparent after:border-b-[12px] after:border-b-white">
                        <p className="inline-block mb-0 clr-neutral-500">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="p-4 flex items-center flex-wrap gap-4">
            <div className="flex items-center justify-between max-w-[150px] gap-4 shrink-0">
              <div className="shrink-0">
                <Link
                  href="#"
                  className="link inline-block clr-neutral-500 hover:text-primary"
                >
                  <PlusCircleIcon className="w-6 h-6" />
                </Link>
              </div>
              <div className="shrink-0">
                <Link
                  href="#"
                  className="link inline-block clr-neutral-500 hover:text-primary"
                >
                  <MicrophoneIcon className="w-6 h-6" />
                </Link>
              </div>
              <div className="shrink-0">
                <Link
                  href="#"
                  className="link inline-block clr-neutral-500 hover:text-primary"
                >
                  <CameraIcon className="w-6 h-6" />
                </Link>
              </div>
              <div className="shrink-0">
                <Link
                  href="#"
                  className="link inline-block clr-neutral-500 hover:text-primary"
                >
                  <FaceSmileIcon className="w-6 h-6" />
                </Link>
              </div>
            </div>
            <div className="flex items-center flex-grow p-2 border border-neutral-30 bg-[var(--bg-2)] rounded-full">
              <input
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                type="text"
                placeholder="Type message..."
                className="w-full bg-transparent focus:outline-none border-0 flex-grow"
              />
              <button
                type="button"
                onClick={handleAddMessage}
                className="grid place-content-center w-10 h-10 rounded-full border-0 bg-primary text-white shrink-0"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center p-5 w-full">
          <p>No conversation has been selected yet</p>
        </div>
      )}
    </>
  );
};

export default Conversations;
