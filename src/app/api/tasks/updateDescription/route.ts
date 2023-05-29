import { updateDescription } from "@/entities/task/api/updateDescription";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: taskId, newDescription } = await request.json();

  if (!taskId) {
    return NextResponse.json({ data: "Task id can't be empty" });
  }

  const task = await updateDescription(taskId, newDescription);

  return NextResponse.json(task);
}
