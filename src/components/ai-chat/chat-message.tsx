"use client";

import ReactMarkdown from "react-markdown";

import { ChatMessage } from "@/types/chat";

import { FiCopy } from "react-icons/fi";

interface Props {
  message: ChatMessage;
}

export default function ChatMessageBox({
  message,
}: Props) {
  const isUser =
    message.role === "user";

  const copyMessage = async () => {
    await navigator.clipboard.writeText(
      message.content
    );
  };

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div className="relative group max-w-2xl">

        <div
          className={`rounded-2xl px-5 py-4 whitespace-pre-wrap ${
            isUser
              ? "bg-black text-white"
              : "bg-zinc-100 dark:bg-zinc-900"
          }`}
        >
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        </div>

        {!isUser && (
          <button
            onClick={copyMessage}

            className="absolute -right-10 top-3 opacity-0 group-hover:opacity-100 transition"
          >
            <FiCopy size={18} />
          </button>
        )}

      </div>
    </div>
  );
}