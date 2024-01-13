import { updateDeadline } from "@/app/lib/data/task/updateDeadline";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todoId: taskId, deadline } = await request.json();

  if (!taskId) {
    return NextResponse.json({ data: "Task id can't be empty" });
  }

  const task = await updateDeadline(taskId, deadline);

  return NextResponse.json(task);
}
