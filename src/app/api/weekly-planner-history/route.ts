import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/configs/db";

import { weeklyPlanners } from "@/db/schema";

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
          weeklyPlanners
        )
        .where(
          eq(
            weeklyPlanners.createdBy,
            userId
          )
        )
        .orderBy(
          desc(
            weeklyPlanners.createdAt
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
          "Failed to fetch planner history",
      },
      {
        status: 500,
      }
    );
  }
}