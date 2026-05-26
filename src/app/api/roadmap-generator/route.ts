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
      level,
    } = body;

    if (!role || !level) {

      return NextResponse.json(
        {
          error:
            "Role and level are required",
        },
        {
          status: 400,
        }
      );
    }

    // PROMPT
    const prompt = `
Generate a practical and modern career roadmap for becoming a ${level} ${role}.

STRICT RULES:

1. ONLY use REAL and VALID URLs.
2. NEVER invent fake links.
3. Use official documentation whenever possible.
4. Use high-quality YouTube tutorials.
5. Use real GitHub repositories.
6. Keep roadmap concise and practical.
7. Use proper markdown formatting.
8. Avoid repeating topics.
9. Make roadmap beginner-friendly and realistic.
10. Separate sections clearly.

OUTPUT FORMAT:

# Career Roadmap Title

## Learning Phases
### Phase 1
- topic

### Phase 2
- topic

## Technologies to Learn

### Frontend
- technology

### Backend
- technology

### Database
- technology

## Projects to Build
- project idea

## Interview Preparation
- DSA
- resume
- portfolio

## Resources

### Documentation
- Name: URL

### YouTube
- Name: URL

### GitHub
- Name: URL

### Courses
- Name: URL

IMPORTANT:
- Return ONLY markdown.
- Do NOT add explanations outside markdown.
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
              "You are an elite AI career mentor and roadmap generator.",
          },

          {
            role: "user",

            content:
              prompt,
          },
        ],

        temperature: 0.7,

        max_tokens: 1400,
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

        level,

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
          error instanceof Error
            ? error.message
            : "Failed to generate roadmap",
      },
      {
        status: 500,
      }
    );
  }
}