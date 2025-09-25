import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET() {
  try {
    const leaderboard = await db.user.findMany({
      orderBy: { record: "desc" },
      take: 100,
      select: {
        id: true,
        name: true,
        imageUrl: true,
        record: true,
      },
    });
    return NextResponse.json({ leaderboard });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
