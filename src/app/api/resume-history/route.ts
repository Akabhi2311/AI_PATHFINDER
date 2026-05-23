import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/configs/db";

import { resumeAnalysis } from "@/db/schema";

import {
  desc,
  eq,
} from "drizzle-orm";

export async function GET() {

  try {

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

    const history =
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
        )
        .orderBy(
          desc(
            resumeAnalysis.createdAt
          )
        )
        .limit(5);

    return NextResponse.json(
      history
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch history",
      },
      {
        status: 500,
      }
    );
  }
}