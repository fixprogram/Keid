import { updateTitle } from "@/entities/subtask/models/updateTitle";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todoId: subtaskId, title } = await request.json();

  if (!subtaskId) {
    return NextResponse.json({ data: "Subtask id can't be empty" });
  }

  const task = await updateTitle(subtaskId, title);

  return NextResponse.json(task);
}
