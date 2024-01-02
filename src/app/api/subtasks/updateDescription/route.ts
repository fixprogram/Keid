import { updateDescription } from "@/backend/service/subtask/updateDescription";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: subtaskId, newDescription } = await request.json();

  if (!subtaskId) {
    return NextResponse.json({ data: "Subtask id can't be empty" });
  }

  const task = await updateDescription(subtaskId, newDescription);

  return NextResponse.json(task);
}
