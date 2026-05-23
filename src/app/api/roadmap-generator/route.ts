import {
  NextRequest,
  NextResponse,
} from "next/server";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest
) {
  try {
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
            model: "phi3:mini",

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

    const roadmap =
      data?.response || "";

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
          "Failed to generate roadmap",
      },
      {
        status: 500,
      }
    );
  }
}