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
      where: { clerkId: clerkUser.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      record: user.record,
      imageUrl: user.imageUrl,
      name: user.name,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch user record" },
      { status: 500 }
    );
  }
}
