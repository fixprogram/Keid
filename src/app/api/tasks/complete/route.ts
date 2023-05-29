import { completeTask } from "@/entities/task/api/completeTask";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: taskId } = await request.json();

  if (!taskId) {
    return NextResponse.json({ data: "Task id can't be empty" });
  }

  const task = await completeTask(taskId);

  return NextResponse.json(task);
}
