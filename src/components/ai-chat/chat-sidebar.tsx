"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import axios from "axios";

import {
  usePathname,
} from "next/navigation";

import { Plus } from "lucide-react";

import { v4 as uuidv4 } from "uuid";

interface Chat {
  chatId: string;

  message: string;
}

export default function ChatSidebar() {
  const [chats, setChats] =
    useState<Chat[]>([]);

  const pathname =
    usePathname();

  useEffect(() => {
    const loadChats = async () => {
      try {
        const res = await axios.get(
          "/api/user-chats"
        );

        setChats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadChats();
  }, []);

  const createNewChat = () => {
    const id = uuidv4();

    window.location.href =
      `/ai-tools/ai-chat/${id}`;
  };

  return (
    <div className="w-72 border-r h-screen p-5 flex flex-col bg-white dark:bg-black">

      <button
        onClick={createNewChat}

        className="w-full flex items-center gap-2 bg-black dark:bg-white dark:text-black text-white p-3 rounded-xl hover:opacity-90 transition"
      >
        <Plus size={18} />

        New Chat
      </button>

      <div className="mt-8 flex-1 overflow-y-auto space-y-2">

        {chats.map((chat) => (
          <Link
            key={chat.chatId}

            href={`/ai-tools/ai-chat/${chat.chatId}`}

            className={`block p-3 rounded-xl text-sm transition-all duration-200 ${
              pathname ===
              `/ai-tools/ai-chat/${chat.chatId}`
                ? "bg-zinc-200 dark:bg-zinc-800"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
            }`}
          >
            <p className="truncate">
              {chat.message}
            </p>
          </Link>
        ))}

      </div>

    </div>
  );
}