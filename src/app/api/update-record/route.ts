import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function PUT(request: Request) {
  const { newRecord } = await request.json();
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
    if (!user) {
      return NextResponse.json(
        { error: "No such user in DataBase" },
        { status: 401 }
      );
    }
    if (newRecord > user.record) {
      const updatedUser = await db.user.update({
        where: { clerkId: clerkUser.id },
        data: { record: newRecord },
      });
      return NextResponse.json({ record: updatedUser.record });
    } else {
      return NextResponse.json({
        record: user.record,
        message: "Current record is better",
      });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to update user record" },
      { status: 500 }
    );
  }
}
