import { createSubtask } from "@/backend/service/task/createSubtask";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, taskId, title, deadline } = await request.json();

  if (!title) {
    return NextResponse.json({ data: "Title can't be empty" });
  }

  const subtask = await createSubtask({ userId, taskId, title, deadline });

  return NextResponse.json(subtask);
}
