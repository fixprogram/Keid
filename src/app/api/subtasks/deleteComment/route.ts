import { deleteComment } from "@/entities/subtask/models/deleteComment";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: subtaskId, commentTime } = await request.json();

  if (!commentTime) {
    return NextResponse.json({ data: "Comment time can't be empty" });
  }

  const subtask = await deleteComment(subtaskId, commentTime);

  return NextResponse.json(subtask);
}
