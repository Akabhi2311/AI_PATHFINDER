import {
  NextResponse,
} from "next/server";

import {
  auth,
} from "@clerk/nextjs/server";

import { db } from "@/configs/db";

import {
  resumeAnalysis,
  roadmaps,
  aiChats,
  weeklyPlanners,
  skillGapReports,
  mockInterviews,
} from "@/db/schema";

import {
  eq,
} from "drizzle-orm";

export async function GET() {

  try {

    const { userId } =
      await auth();

    if (!userId) {

      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const resumes =
      await db
        .select()
        .from(
          resumeAnalysis
        )
        .where(
          eq(
            resumeAnalysis.createdBy,
            userId
          )
        );

    const roadmapData =
      await db
        .select()
        .from(
          roadmaps
        )
        .where(
          eq(
            roadmaps.createdBy,
            userId
          )
        );

    const chats =
      await db
        .select()
        .from(
          aiChats
        )
        .where(
          eq(
            aiChats.createdBy,
            userId
          )
        );

    const planners =
      await db
        .select()
        .from(
          weeklyPlanners
        )
        .where(
          eq(
            weeklyPlanners.createdBy,
            userId
          )
        );

    const skills =
      await db
        .select()
        .from(
          skillGapReports
        )
        .where(
          eq(
            skillGapReports.createdBy,
            userId
          )
        );

    const interviews =
      await db
        .select()
        .from(
          mockInterviews
        )
        .where(
          eq(
            mockInterviews.createdBy,
            userId
          )
        );

    return NextResponse.json({

      resumeAnalyses:
        resumes.length,

      roadmaps:
        roadmapData.length,

      aiChats:
        chats.length,

      weeklyPlanners:
        planners.length,

      skillReports:
        skills.length,

      mockInterviews:
        interviews.length,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch stats",
      },
      {
        status: 500,
      }
    );
  }
}