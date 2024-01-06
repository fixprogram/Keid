import { createChallenge } from "@/backend/service/challenge/createChallenge";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, title, style, deadline, repeats, members } =
    await request.json();

  if (!title || !userId) {
    return NextResponse.json({
      data: "Challenge title and userId can't be empty",
    });
  }

  const habit = await createChallenge({
    userId,
    title,
    style,
    deadline,
    repeats,
    memberIds: members,
  });

  return NextResponse.json({ id: habit.id });
}