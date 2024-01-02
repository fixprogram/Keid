import { deleteChallenge } from "@/backend/service/challenge/deleteChallenge";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: id } = await request.json();

  if (!id) {
    return NextResponse.json({ data: "Challenge id can't be empty" });
  }

  const challenge = await deleteChallenge(id);

  return NextResponse.json(challenge);
}
