import { createTask } from "@/backend/service/task/createTask";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, taskName, taskStyle, deadline, projectName, repeats } =
    await request.json();

  if (!taskName) {
    return NextResponse.json({ data: "Task name can't be empty" });
  }

  const task = await createTask({
    userId,
    projectName,
    taskName,
    taskStyle,
    deadline,
    repeats,
  });

  return NextResponse.json({ id: task.id });
}
