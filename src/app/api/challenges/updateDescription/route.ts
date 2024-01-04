import { updateDescription } from "@/backend/service/challenge/updateDescription";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: id, newDescription } = await request.json();

  if (!id) {
    return NextResponse.json({ data: "Challenge id can't be empty" });
  }

  const challenge = await updateDescription(id, newDescription);

  return NextResponse.json(challenge);
}
