import { deleteSubtask } from "@/backend/service/subtask/deleteSubtask";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: subtaskId } = await request.json();

  if (!subtaskId) {
    return NextResponse.json({ data: "Subtask id can't be empty" });
  }

  const subtask = await deleteSubtask(subtaskId);

  return NextResponse.json(subtask);
}
