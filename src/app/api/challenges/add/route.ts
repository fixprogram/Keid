import { createChallenge } from "@/app/lib/data/challenge/createChallenge";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, title, style, deadline, repeats, members, points } =
    await request.json();

  if (!title || !userId) {
    return NextResponse.json({
      data: "Challenge title and userId can't be empty",
    });
  }

  const challenge = await createChallenge({
    userId,
    title,
    style,
    deadline,
    repeats,
    memberIds: members,
    points,
  });

  return NextResponse.json({ id: challenge.id });
}
