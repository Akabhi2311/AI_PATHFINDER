import {
  NextResponse,
} from "next/server";

import { auth } from "@clerk/nextjs/server";

import { getUserChats } from "@/lib/chat";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const chats =
      await getUserChats(userId);

    // unique chats only
    const uniqueChats = Array.from(
      new Map(
        chats.map((chat) => [
          chat.chatId,
          chat,
        ])
      ).values()
    );

    return NextResponse.json(
      uniqueChats
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}