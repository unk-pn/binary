import { NextResponse } from "next/server";
import { checkUser } from "../../../../lib/checkUser";

export async function POST() {
  try {
    const user = await checkUser();
    return NextResponse.json({ user });
  } catch  {
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
