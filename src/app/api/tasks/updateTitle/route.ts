import { updateTitle } from "@/backend/service/task/updateTitle";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todoId: taskId, title } = await request.json();

  if (!taskId) {
    return NextResponse.json({ data: "Task id can't be empty" });
  }

  const task = await updateTitle(taskId, title);

  return NextResponse.json(task);
}
