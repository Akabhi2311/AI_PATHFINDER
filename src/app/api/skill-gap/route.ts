export const runtime = "nodejs";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import { auth } from "@clerk/nextjs/server";

import fs from "fs";

import path from "path";

import { PdfReader } from "pdfreader";

import { db } from "@/configs/db";

import { skillGapReports } from "@/db/schema";

const COMMON_SKILLS = [
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "AWS",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "AI",
  "Git",
  "Machine Learning",
  "TensorFlow",
  "PyTorch",
  "Express.js",
  "Tailwind",
];

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

    const formData =
      await req.formData();

    const targetRole =
      formData.get(
        "targetRole"
      ) as string;

    const skills =
      formData.get(
        "skills"
      ) as string;

    const file =
      formData.get(
        "file"
      ) as File;

    if (!targetRole) {

      return NextResponse.json(
        {
          error:
            "Target role required",
        },
        {
          status: 400,
        }
      );
    }

    let extractedSkills:
      string[] = [];

    // MANUAL SKILLS
    if (skills) {

      extractedSkills =
        skills
          .split(",")
          .map((s) =>
            s.trim()
          );
    }

    // RESUME PARSING
    if (file) {

      const bytes =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(bytes);

      const uploadDir =
        path.join(
          process.cwd(),
          "public/uploads"
        );

      if (
        !fs.existsSync(
          uploadDir
        )
      ) {
        fs.mkdirSync(
          uploadDir,
          {
            recursive: true,
          }
        );
      }

      const filePath =
        path.join(
          uploadDir,
          file.name
        );

      fs.writeFileSync(
        filePath,
        buffer
      );

      // PDF TEXT EXTRACTION
      const extractedText =
        await new Promise<string>(
          (
            resolve,
            reject
          ) => {

            let text = "";

            new PdfReader().parseFileItems(
              filePath,

              (
                err,
                item
              ) => {

                if (err)
                  reject(err);

                else if (
                  !item
                )
                  resolve(
                    text
                  );

                else if (
                  item.text
                )
                  text +=
                    item.text +
                    " ";
              }
            );
          }
        );

      extractedSkills =
        COMMON_SKILLS.filter(
          (skill) =>
            extractedText
              .toLowerCase()
              .includes(
                skill.toLowerCase()
              )
        );
    }

    // OLLAMA
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
            model:
              "phi3:mini",

            messages: [
              {
                role: "system",

                content: `
You are an elite AI career coach.

Analyze:
1. Current skills
2. Missing skills
3. Learning roadmap
4. Strong projects
5. Job preparation advice

Respond STRICTLY in this format:

CURRENT_SKILLS:
skill1, skill2

MISSING_SKILLS:
skill1, skill2

ROADMAP:
...

PROJECTS:
...

JOB_PREP:
...
                `,
              },

              {
                role: "user",

                content: `
Target Role:
${targetRole}

Current Skills:
${extractedSkills.join(
  ", "
)}
                `,
              },
            ],

            stream: false,
          }),
        }
      );

    const aiData =
      await ollamaResponse.json();

    const aiText =
      aiData.message?.content ||
      "";

    // PARSE OUTPUT
    const missingSkillsMatch =
      aiText.match(
        /MISSING_SKILLS:([\s\S]*?)ROADMAP:/
      );

    const roadmapMatch =
      aiText.match(
        /ROADMAP:([\s\S]*?)PROJECTS:/
      );

    // DATABASE SAVE
    await db
  .insert(
    skillGapReports
  )
  .values({
    targetRole,

    currentSkills:
      extractedSkills.join(
        ", "
      ),

    missingSkills:
      missingSkillsMatch?.[1] ||
      "",

    roadmap:
      roadmapMatch?.[1] ||
      "",

    createdBy:
      userId,
  });

    return NextResponse.json({
      analysis: aiText,

      currentSkills:
        extractedSkills,

      missingSkills:
        missingSkillsMatch?.[1]
          ?.split(",")
          .map((s:any) =>
            s.trim()
          ) || [],

      roadmap:
        roadmapMatch?.[1] ||
        "",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Skill gap analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}