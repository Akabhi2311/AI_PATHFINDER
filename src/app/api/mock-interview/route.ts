export const runtime = "nodejs";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/configs/db";

import { mockInterviews } from "@/db/schema";

export async function POST(
  req: NextRequest
) {
  try {

    // AUTH
    const { userId } =
      await auth();

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

    // BODY
    const body =
      await req.json();

    const {
      role,
      level,
    } = body;

    if (!role || !level) {

      return NextResponse.json(
        {
          error:
            "Missing fields",
        },
        {
          status: 400,
        }
      );
    }

    // TIMEOUT CONTROLLER
    const controller =
      new AbortController();

    const timeout =
      setTimeout(
        () =>
          controller.abort(),
        180000
      );

    // PROMPT
    const prompt = `
You are an elite technical interviewer from top tech companies.

Generate a practical mock interview preparation guide.

STRICT RULES:
- Keep response concise
- Avoid repetition
- Focus on practical preparation
- Keep answers short
- Generate only 3 questions per section

FORMAT:

# TECHNICAL QUESTIONS
1. Question
Ideal Answer:
...

# DSA QUESTIONS
1. Question
Ideal Answer:
...

# HR QUESTIONS
1. Question
Ideal Answer:
...

# SYSTEM DESIGN QUESTIONS
1. Question
Ideal Answer:
...

# INTERVIEW TIPS
- ...

# COMMON MISTAKES
- ...

ROLE:
${role}

EXPERIENCE LEVEL:
${level}
`;

    // OLLAMA REQUEST
    const ollamaResponse =
      await fetch(
        "http://127.0.0.1:11434/api/generate",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          signal:
            controller.signal,

          body: JSON.stringify({
            model:
              "phi3:mini",

            prompt,

            stream: false,

            options: {
              temperature: 0.7,

              num_predict: 1200,
            },
          }),
        }
      );

    clearTimeout(timeout);

    // OLLAMA ERROR
    if (!ollamaResponse.ok) {

      return NextResponse.json(
        {
          error:
            "Failed to connect to Ollama",
        },
        {
          status: 500,
        }
      );
    }

    // RESPONSE
    const aiData =
      await ollamaResponse.json();

    const interviewGuide =
      aiData.response ||
      "No interview guide generated";

    // SAVE TO DB
    await db
      .insert(
        mockInterviews
      )
      .values({
        role,
        level,
        interviewGuide,
        createdBy:
          userId,
      });

    // RETURN
    return NextResponse.json({
      interviewGuide,
    });

  } catch (error) {

    console.log(
      "MOCK INTERVIEW ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Mock interview failed",
      },
      {
        status: 500,
      }
    );
  }
}