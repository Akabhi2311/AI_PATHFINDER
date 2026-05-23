export const runtime = "nodejs";

import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function POST(
  req: NextRequest
) {
  try {
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

    // OLLAMA REQUEST
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

Keep response highly structured.
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

            stream: false,
          }),
        }
      );

    const aiData =
      await ollamaResponse.json();

    const roadmap =
      aiData.message?.content ||
      "No roadmap generated";

    return NextResponse.json({
      roadmap,
    });
  } catch (error) {
    console.log(error);

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