import {
  NextRequest,
  NextResponse,
} from "next/server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/configs/db";

import { weeklyPlanners } from "@/db/schema";

export const runtime = "nodejs";

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

    // OLLAMA
    const response =
      await fetch(
        "http://127.0.0.1:11434/api/generate",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            model:
              "phi3:mini",

            prompt,

            stream: false,
          }),
        }
      );

    if (!response.ok) {

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

    const data =
      await response.json();

    const planner =
      data?.response;

    if (!planner) {

      return NextResponse.json(
        {
          error:
            "No planner returned from Ollama",
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
          "Failed to generate planner",
      },
      {
        status: 500,
      }
    );
  }
}