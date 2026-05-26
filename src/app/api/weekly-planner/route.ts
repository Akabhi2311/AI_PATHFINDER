export const runtime = "nodejs";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/configs/db";

import { weeklyPlanners } from "@/db/schema";

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
      roadmap,
    } = body;

    if (
      !role ||
      !roadmap
    ) {

      return NextResponse.json(
        {
          error:
            "Role and roadmap are required",
        },
        {
          status: 400,
        }
      );
    }

    // PROMPT
    const prompt = `
You are an expert AI career coach.

Based on the following roadmap, generate a practical and realistic weekly learning planner.

ROLE:
${role}

ROADMAP:
${roadmap}

STRICT RULES:

1. Maximum 6 study hours/day.
2. Divide tasks day-wise.
3. Include:
   - learning
   - coding
   - revision
   - projects
   - interview prep
4. Keep tasks concise.
5. Make weekends lighter.
6. Avoid repeating tasks.
7. Keep roadmap-based progression.
8. Use proper markdown formatting.
9. Return ONLY markdown.

OUTPUT FORMAT:

# Weekly Planner

## Monday
- task

## Tuesday
- task

## Wednesday
- task

## Thursday
- task

## Friday
- task

## Saturday
- task

## Sunday
- revision
- planning
- rest
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
              "You are an expert AI career coach and productivity mentor.",
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
    const planner =
      completion.choices[0]
        ?.message?.content ||
      "";

    if (!planner) {

      return NextResponse.json(
        {
          error:
            "No planner generated",
        },
        {
          status: 500,
        }
      );
    }

    // SAVE TO DB
    await db
      .insert(
        weeklyPlanners
      )
      .values({
        role,

        roadmap,

        planner,

        createdBy:
          userId,
      });

    // RESPONSE
    return NextResponse.json({
      planner,
    });

  } catch (error) {

    console.log(
      "PLANNER ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate planner",
      },
      {
        status: 500,
      }
    );
  }
}