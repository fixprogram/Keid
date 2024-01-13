import { completeTaskAndSubtasks } from "@/app/lib/data/task/completeTask";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: taskId, comment } = await request.json();

  if (!taskId) {
    return NextResponse.json({ data: "Task id can't be empty" });
  }

  const task = await completeTaskAndSubtasks(taskId, comment);

  return NextResponse.json(task);
}
