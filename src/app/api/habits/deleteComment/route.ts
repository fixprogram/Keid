import { deleteComment } from "@/app/lib/data/habit/deleteComment";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: id, commentTime } = await request.json();

  if (!commentTime) {
    return NextResponse.json({ data: "Comment time can't be empty" });
  }

  const habit = await deleteComment(id, commentTime);

  return NextResponse.json(habit);
}
