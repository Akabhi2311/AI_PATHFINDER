import {
  NextRequest,
} from "next/server";

import { auth } from "@clerk/nextjs/server";

import { saveMessage } from "@/lib/chat";

export async function POST(
  req: NextRequest
) {
  const encoder = new TextEncoder();

  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response(
        "Unauthorized",
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    await saveMessage({
      chatId: body.chatid,

      role: "user",

      message: body.message,

      createdBy: userId,
    });

    const ollamaResponse =
      await fetch(
        "http://127.0.0.1:11434/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            model: "phi3:mini",

            messages: [
              {
                role: "system",

                content: `
You are a professional AI Career Coach.

Rules:
- Answer ONLY career-related questions.
- Keep responses concise.
- Maximum 120 words.
- Give practical advice only.
                `,
              },

              {
                role: "user",

                content: body.message,
              },
            ],

            stream: true,
          }),
        }
      );

    const reader =
      ollamaResponse.body?.getReader();

    let fullResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        if (!reader) return;

        while (true) {
          const {
            done,
            value,
          } = await reader.read();

          if (done) break;

          const chunk =
            new TextDecoder().decode(
              value
            );

          const lines = chunk
            .split("\n")
            .filter(Boolean);

          for (const line of lines) {
            try {
              const parsed =
                JSON.parse(line);

              const content =
                parsed.message
                  ?.content || "";

              fullResponse += content;

              controller.enqueue(
                encoder.encode(content)
              );
            } catch (err) {
              console.log(err);
            }
          }
        }

        await saveMessage({
          chatId: body.chatid,

          role: "assistant",

          message: fullResponse,

          createdBy: userId,
        });

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type":
          "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.log(error);

    return new Response(
      "AI Error",
      {
        status: 500,
      }
    );
  }
}