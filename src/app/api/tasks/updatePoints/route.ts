import { updatePoints } from "@/backend/service/task/updatePoints";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: taskId, newPoints } = await request.json();

  if (!taskId) {
    return NextResponse.json({ data: "Task id can't be empty" });
  }

  const task = await updatePoints(taskId, newPoints);

  return NextResponse.json(task);
}
