import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    const user = await db.user.findUnique({
      where: { clerkId: clerkUser?.id },
    });
    return NextResponse.json({ record: user?.record });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
