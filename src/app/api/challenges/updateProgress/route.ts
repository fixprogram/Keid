import { updateProgress } from "@/backend/service/challenge/updateProgress";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: id, progress, comment } = await request.json();

  if (!id) {
    return NextResponse.json({ data: "Challenge id can't be empty" });
  }

  const challenge = await updateProgress(id, progress, comment);

  return NextResponse.json(challenge);
}
