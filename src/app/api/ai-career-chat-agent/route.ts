import {
  NextRequest,
  NextResponse,
} from "next/server";

import { auth } from "@clerk/nextjs/server";

import { saveMessage } from "@/lib/chat";

import { groq } from "@/configs/ai";

export async function POST(
  req: NextRequest
) {

  try {

    // AUTH
    const { userId } =
      await auth();

    if (!userId) {

      return new Response(
        "Unauthorized",
        {
          status: 401,
        }
      );
    }

    // BODY
    const body =
      await req.json();

    // SAVE USER MESSAGE
    await saveMessage({
      chatId:
        body.chatId,

      role: "user",

      message:
        body.message,

      createdBy:
        userId,
    });

    // GROQ AI
    const completion =
      await groq.chat.completions.create({
        model:
          "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",

            content: `
You are a professional AI Career Coach.

Rules:
- Answer ONLY career-related questions
- Keep responses concise
- Maximum 120 words
- Give practical advice only
- Be professional and motivating
            `,
          },

          {
            role: "user",

            content:
              body.message,
          },
        ],

        temperature: 0.7,

        max_tokens: 300,
      });

    // AI RESPONSE
    const aiResponse =
      completion.choices[0]
        ?.message?.content ||
      "No response generated";

    // SAVE AI MESSAGE
    await saveMessage({
      chatId:
        body.chatId,

      role:
        "assistant",

      message:
        aiResponse,

      createdBy:
        userId,
    });

    // RETURN RESPONSE
    return NextResponse.json({
      message:
        aiResponse,
    });

  } catch (error) {

    console.log(
      "AI CHAT ERROR:",
      error
    );

    return new Response(
      "AI Error",
      {
        status: 500,
      }
    );
  }
}