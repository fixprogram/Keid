import { deleteComment } from "@/app/lib/data/task/deleteComment";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: taskId, commentTime } = await request.json();

  if (!commentTime) {
    return NextResponse.json({ data: "Comment time can't be empty" });
  }

  const task = await deleteComment(taskId, commentTime);

  return NextResponse.json(task);
}
