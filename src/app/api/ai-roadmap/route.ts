export const runtime = "nodejs";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/configs/db";

import { roadmaps } from "@/db/schema";

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
      skills,
    } = body;

    if (!role || !skills) {

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

    // GROQ AI
    const completion =
      await groq.chat.completions.create({
        model:
          "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",

            content: `
You are an elite AI career mentor.

Generate a detailed roadmap for the user.

Include:
1. 30 Day Plan
2. 60 Day Plan
3. 90 Day Plan
4. Recommended Projects
5. DSA Preparation
6. Interview Preparation
7. Certifications
8. Free Learning Resources

Keep response highly structured and concise.
            `,
          },

          {
            role: "user",

            content: `
Target Role:
${role}

Current Skills:
${skills}
            `,
          },
        ],

        temperature: 0.7,

        max_tokens: 1200,
      });

    // AI RESPONSE
    const roadmap =
      completion.choices[0]
        ?.message?.content ||
      "No roadmap generated";

    // SAVE TO DATABASE
    await db
      .insert(
        roadmaps
      )
      .values({
        role,

        skills,

        roadmap,

        createdBy:
          userId,
      });

    // RESPONSE
    return NextResponse.json({
      roadmap,
    });

  } catch (error) {

    console.log(
      "ROADMAP ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Roadmap generation failed",
      },
      {
        status: 500,
      }
    );
  }
}