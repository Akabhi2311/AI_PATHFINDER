import {
  NextRequest,
  NextResponse,
} from "next/server";

import { getChatMessages } from "@/lib/chat";

interface Props {
  params: Promise<{
    chatid: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Props
) {
  try {
    const resolvedParams =
      await params;

    const messages =
      await getChatMessages(
        resolvedParams.chatid
      );

    return NextResponse.json(messages);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to load chats",
      },
      {
        status: 500,
      }
    );
  }
}