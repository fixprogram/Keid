import { addComment } from "@/backend/service/subtask/addComment";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, itemId: subtaskId, comment } = await request.json();

  if (!comment) {
    return NextResponse.json({ data: "Comment can't be empty" });
  }

  const subtask = await addComment(subtaskId, userId, comment);

  return NextResponse.json(subtask);
}
