import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/configs/db";

import { skillGapReports } from "@/db/schema";

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
          skillGapReports
        )
        .where(
          eq(
            skillGapReports.createdBy,
            userId
          )
        )
        .orderBy(
          desc(
            skillGapReports.createdAt
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
          "Failed to fetch reports",
      },
      {
        status: 500,
      }
    );
  }
}