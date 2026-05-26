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

import { resumeAnalysis } from "@/db/schema";

import { groq } from "@/configs/ai";

export async function POST(
  req: NextRequest
) {

  try {

    console.log("API HIT");

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

    // FORM DATA
    const formData =
      await req.formData();

    const file =
      formData.get("file") as File;

    if (!file) {

      return NextResponse.json(
        {
          error:
            "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    console.log(
      "FILE:",
      file.name
    );

    // BUFFER
    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    console.log(
      "BUFFER SUCCESS"
    );

    // UPLOAD DIRECTORY
    const uploadDir =
      path.join(
        process.cwd(),
        "public/uploads"
      );

    if (
      !fs.existsSync(uploadDir)
    ) {

      fs.mkdirSync(
        uploadDir,
        {
          recursive: true,
        }
      );
    }

    // SAVE FILE
    const filePath =
      path.join(
        uploadDir,
        file.name
      );

    fs.writeFileSync(
      filePath,
      buffer
    );

    console.log(
      "LOCAL SAVE SUCCESS"
    );

    // PUBLIC URL
    const fileUrl =
      `/uploads/${file.name}`;

    // PDF EXTRACTION
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

              if (err) {

                reject(err);

              } else if (
                !item
              ) {

                resolve(text);

              } else if (
                item.text
              ) {

                text +=
                  item.text +
                  " ";
              }
            }
          );
        }
      );

    console.log(
      "PDF EXTRACTION SUCCESS"
    );

    // GROQ AI
    const completion =
      await groq.chat.completions.create({
        model:
          "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",

            content: `
You are an expert ATS resume analyzer.

Analyze the resume and provide:

1. ATS score out of 100
2. Key strengths
3. Missing skills
4. Resume improvements
5. Career suggestions

Keep response concise and structured.
            `,
          },

          {
            role: "user",

            content:
              extractedText,
          },
        ],

        temperature: 0.7,

        max_tokens: 800,
      });

    console.log(
      "GROQ SUCCESS"
    );

    // AI RESPONSE
    const aiAnalysis =
      completion.choices[0]
        ?.message?.content ||
      "No analysis generated";

    // ATS SCORE
    const scoreMatch =
      aiAnalysis.match(
        /\b(\d{2,3})\/100\b/
      );

    const atsScore =
      scoreMatch
        ? scoreMatch[1]
        : "75";

    // SKILLS
    const skills = [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Python",
      "Java",
      "C++",
      "AI",
      "Git",
      "Machine Learning",
      "TensorFlow",
      "PyTorch",
      "Docker",
      "AWS",
      "TypeScript",
    ].filter((skill) =>
      extractedText
        .toLowerCase()
        .includes(
          skill.toLowerCase()
        )
    );

    // DATABASE SAVE
    await db
      .insert(
        resumeAnalysis
      )
      .values({
        resumeUrl:
          fileUrl,

        aiAnalysis,

        atsScore,

        extractedSkills:
          skills.join(", "),

        createdBy:
          userId,
      });

    console.log(
      "DATABASE SAVE SUCCESS"
    );

    // RESPONSE
    return NextResponse.json({
      success: true,

      resumeUrl:
        fileUrl,

      extractedText,

      analysis:
        aiAnalysis,

      atsScore,

      skills,
    });

  } catch (error) {

    console.error(
      "FULL ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed",
      },
      {
        status: 500,
      }
    );
  }
}