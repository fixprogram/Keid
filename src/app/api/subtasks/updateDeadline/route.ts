import { updateDeadline } from "@/backend/service/subtask/updateDeadline";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todoId: subtaskId, deadline } = await request.json();

  if (!subtaskId) {
    return NextResponse.json({ data: "Subtask id can't be empty" });
  }

  const task = await updateDeadline(subtaskId, deadline);

  return NextResponse.json(task);
}
