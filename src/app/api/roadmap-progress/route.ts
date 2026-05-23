export const runtime = "nodejs";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import { db } from "@/configs/db";

import {
  roadmapProgress,
} from "@/db/schema";

import { eq } from "drizzle-orm";

export async function POST(
  req: NextRequest
) {
  try {
    const body =
      await req.json();

    const {
      roadmapId,
      step,
      completed,
    } = body;

    const existing =
      await db
        .select()
        .from(
          roadmapProgress
        )
        .where(
          eq(
            roadmapProgress.step,
            step
          )
        );

    if (
      existing.length > 0
    ) {
      await db
        .update(
          roadmapProgress
        )
        .set({
          completed,
        })
        .where(
          eq(
            roadmapProgress.step,
            step
          )
        );

      return NextResponse.json({
        success: true,
      });
    }

    await db
      .insert(
        roadmapProgress
      )
      .values({
        roadmapId,
        step,
        completed,
      });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to update progress",
      },
      {
        status: 500,
      }
    );
  }
}