import { complete } from "@/backend/service/challenge/complete";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: id, comment } = await request.json();

  if (!id) {
    return NextResponse.json({ data: "Challenge id can't be empty" });
  }

  const challenge = await complete(id, comment);

  return NextResponse.json(challenge);
}
