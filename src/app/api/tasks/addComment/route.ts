import { addComment } from "@/app/lib/data/task/addComment";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, itemId: taskId, comment } = await request.json();

  if (!comment) {
    return NextResponse.json({ data: "Comment can't be empty" });
  }

  const task = await addComment(taskId, userId, comment);

  return NextResponse.json(task);
}
