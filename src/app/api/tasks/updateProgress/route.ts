import { updateTaskProgress } from "@/entities/task/api/updateTaskProgress";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: taskId, progress, comment } = await request.json();

  if (!taskId) {
    return NextResponse.json({ data: "Task id can't be empty" });
  }

  const task = await updateTaskProgress(taskId, progress, comment);

  return NextResponse.json(task);
}
