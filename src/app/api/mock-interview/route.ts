export const runtime = "nodejs";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/configs/db";

import { mockInterviews } from "@/db/schema";

import { groq } from "@/configs/ai";

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

    // GROQ AI
    const completion =
      await groq.chat.completions.create({
        model:
          "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",

            content:
              "You are an elite technical interviewer from top tech companies.",
          },

          {
            role: "user",

            content:
              prompt,
          },
        ],

        temperature: 0.7,

        max_tokens: 1200,
      });

    // AI RESPONSE
    const interviewGuide =
      completion.choices[0]
        ?.message?.content ||
      "No interview guide generated";

    // SAVE TO DATABASE
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

    // RESPONSE
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