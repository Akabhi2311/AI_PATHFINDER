import { db } from "@/configs/db";

import { aiChats } from "@/db/schema";

import {
  asc,
  desc,
  eq,
} from "drizzle-orm";

interface SaveMessageProps {
  chatId: string;
  role: string;
  message: string;
  createdBy: string;
}

export const saveMessage = async ({
  chatId,
  role,
  message,
  createdBy,
}: SaveMessageProps) => {
  try {
    await db.insert(aiChats).values({
      chatId,
      role,
      message,
      createdBy,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Error saving message:",
      error
    );

    return {
      success: false,
      error,
    };
  }
};

export const getChatMessages = async (
  chatId: string
) => {
  try {
    const messages = await db
      .select()
      .from(aiChats)
      .where(
        eq(aiChats.chatId, chatId)
      )
      .orderBy(
        asc(aiChats.createdAt)
      );

    return messages;
  } catch (error) {
    console.error(
      "Error fetching messages:",
      error
    );

    return [];
  }
};

export const getUserChats = async (
  userId: string
) => {
  try {
    const chats = await db
      .select()
      .from(aiChats)
      .where(
        eq(aiChats.createdBy, userId)
      )
      .orderBy(
        desc(aiChats.createdAt)
      );

    return chats;
  } catch (error) {
    console.error(
      "Error fetching chats:",
      error
    );

    return [];
  }
};