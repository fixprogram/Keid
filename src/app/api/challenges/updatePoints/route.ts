import { updatePoints } from "@/app/lib/data/challenge/updatePoints";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: id, newPoints } = await request.json();

  if (!id) {
    return NextResponse.json({ data: "Challenge id can't be empty" });
  }

  const challenge = await updatePoints(id, newPoints);

  return NextResponse.json(challenge);
}
