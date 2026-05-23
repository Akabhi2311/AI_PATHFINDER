"use client";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import axios from "axios";

import ChatMessageBox from "@/components/ai-chat/chat-message";

import { ChatMessage } from "@/types/chat";

interface Props {
  params: Promise<{
    chatid: string;
  }>;
}

export default function AIChatPage({
  params,
}: Props) {
  const [chatId, setChatId] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [loading, setLoading] =
    useState(false);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  // unwrap async params
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams =
        await params;

      setChatId(
        resolvedParams.chatid
      );
    };

    getParams();
  }, [params]);

  // load old messages
  useEffect(() => {
    if (!chatId) return;

    const loadMessages = async () => {
      try {
        const res = await axios.get(
          `/api/chat-history/${chatId}`
        );

        const formatted =
          res.data.map((msg: any) => ({
            role: msg.role,
            content: msg.message,
          }));

        setMessages(formatted);
      } catch (error) {
        console.log(error);
      }
    };

    loadMessages();
  }, [chatId]);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (
      !message.trim() ||
      loading
    )
      return;

    const userMessage: ChatMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentMessage = message;

    setMessage("");

    try {
      setLoading(true);

      const response = await fetch(
        "/api/ai-career-chat-agent",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message: currentMessage,
            chatid: chatId,
          }),
        }
      );

      if (!response.body) return;

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let aiResponse = "";

      // create empty assistant message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
        },
      ]);

      while (true) {
        const {
          done,
          value,
        } = await reader.read();

        if (done) break;

        const chunk =
          decoder.decode(value);

        aiResponse += chunk;

        setMessages((prev) => {
          const updated = [...prev];

          updated[
            updated.length - 1
          ] = {
            role: "assistant",

            content:
              aiResponse + "▋",
          };

          return updated;
        });
      }

      // remove typing cursor
      setMessages((prev) => {
        const updated = [...prev];

        updated[
          updated.length - 1
        ] = {
          role: "assistant",
          content: aiResponse,
        };

        return updated;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-black">

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {messages.map((msg, index) => (
          <ChatMessageBox
            key={index}
            message={msg}
          />
        ))}

        {loading && (
          <div className="text-sm text-zinc-500 animate-pulse">
            AI is thinking...
          </div>
        )}

        <div ref={bottomRef} />

      </div>

      <div className="border-t p-5 bg-white dark:bg-black">

        <div className="max-w-4xl mx-auto flex gap-3">

          <textarea
            value={message}

            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }

            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();

                handleSend();
              }
            }}

            placeholder="Ask career questions..."

            className="flex-1 border dark:border-zinc-800 rounded-xl p-4 h-16 resize-none bg-white dark:bg-zinc-900"
          />

          <button
            onClick={handleSend}

            disabled={loading}

            className="bg-black dark:bg-white dark:text-black text-white px-6 rounded-xl hover:opacity-90 transition disabled:opacity-50"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}