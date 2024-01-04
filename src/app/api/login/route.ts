import { findUserByEmail } from "@/backend/service/user/findUserByEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Only POST requests allowed" },
      { status: 405 }
    );
  }

  const { email } = await request.json();

  if (!email) {
    throw new Error("No email provided");
  }

  const user = await findUserByEmail(email);

  if (!user) {
    return NextResponse.json({ type: "signup", email }, { status: 200 });
  }

  return NextResponse.json({ type: "signin", email }, { status: 200 });
}
