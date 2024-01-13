import { createTask } from "@/app/lib/data/task/createTask";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    userId,
    taskName,
    taskStyle,
    deadline,
    projectName,
    repeats,
    points,
  } = await request.json();

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
    points,
  });

  return NextResponse.json({ id: task.id });
}
