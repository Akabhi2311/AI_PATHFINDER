export const runtime = "nodejs";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/configs/db";

import { roadmaps } from "@/db/schema";

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
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const history =
      await db
        .select()
        .from(roadmaps)
        .where(
          eq(
            roadmaps.createdBy,
            userId
          )
        )
        .orderBy(
          desc(
            roadmaps.createdAt
          )
        );

    return NextResponse.json(
      history
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch roadmap history",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest
) {
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

    const { id } =
      await req.json();

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Roadmap ID required",
        },
        {
          status: 400,
        }
      );
    }

    await db
      .delete(roadmaps)
      .where(
        eq(
          roadmaps.id,
          id
        )
      );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to delete roadmap",
      },
      {
        status: 500,
      }
    );
  }
}