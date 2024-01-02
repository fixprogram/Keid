import { completeSubtask } from "@/backend/service/subtask/completeSubtask";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: subtaskId } = await request.json();

  if (!subtaskId) {
    return NextResponse.json({ data: "Subtask id can't be empty" });
  }

  const subtask = await completeSubtask(subtaskId);

  return NextResponse.json(subtask);
}
