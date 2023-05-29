import { updateSubtaskProgress } from "@/entities/subtask/models/updateSubtaskDeadline";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: subtaskId, progress, comment } = await request.json();

  if (!subtaskId) {
    return NextResponse.json({ data: "Subtask id can't be empty" });
  }

  const subtask = await updateSubtaskProgress(subtaskId, progress, comment);

  return NextResponse.json(subtask);
}
